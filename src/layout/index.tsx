import type { IRouteComponentProps } from 'umi';
import { useLocation, useModel, withRouter, history } from 'umi';
import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import Footer from '@/components/Footer';
import Header, { MenuList } from '@/components/Header';
import Setting from '@/components/Setting';
import MoblieSidebar from '@/components/MoblieSidebar';
import { getTagsOrCategories } from '@/components/PostList';
import Meta from '@/components/PostList/components/PostItem/components/meta';
import Search from '@/components/Search';
import Sticky from '@/components/Sticky';
import useScroll, { Direction } from '@/hooks/useScroll';
import { BlogType, getBlogType } from '@/utils';
import { HttpCode } from '@/http';
import type { IPostItem } from '@/http/api';
import { getAllPosts } from '@/http/api';
import AnnouncementCard from './components/AnnouncementCard';
import ArchiveCard from './components/ArchiveCard';
import CategoryCard from './components/CategoryCard';
import PostCard from './components/PostCard';
import TagCard from './components/TagCard';
import UserCard from './components/UserCard';
import WebCard from './components/WebCard';
import DirectoryCard from './components/DirectoryCard';

import styles from './index.less';

enum Type {
  HOME = 'home',
  PAGE = 'page',
  POST = 'post',
}

const IsSticky: React.FC<{ top?: number; enable: boolean }> = ({
  top,
  enable,
  children,
}) => {
  return enable ? <Sticky top={top}>{children}</Sticky> : <>{children}</>;
};

const Layout: React.FC<IRouteComponentProps> = ({
  children,
  route: { type = Type.HOME },
}) => {
  const {
    initialState = {
      type: getBlogType(),
      post: {} as IPostItem,
      tags: [],
      categories: [],
      title: '',
      config: {
        quotes: [],
      },
    },
  } = useModel('@@initialState');
  const {
    type: blogType,
    post = {},
    tags = [],
    categories = [],
    title: blogTitle,
    config: { quotes = [] } = {},
  } = initialState;
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [search, setSearch] = useState(false);
  const [text, setText] = useState('');
  const [flash, setFlash] = useState(false);
  const [result, setResult] = useState<IPostItem[]>([]);
  const [allPosts, setAllPosts] = useState<IPostItem[]>([]);
  const { direction, distance } = useScroll();

  const fetchAllPosts = () => {
    getAllPosts().then((res) => {
      if (res.code === HttpCode.SUCCESS) {
        setAllPosts(res.data);
      }
    });
  };

  const style: React.CSSProperties = useMemo(
    () =>
      type === Type.POST && post.cover_img
        ? { backgroundImage: `url(${post.cover_img})` }
        : {},
    [type, post],
  );

  const title =
    // @ts-ignore
    useLocation().query?.title ||
    // eslint-disable-next-line react-hooks/rules-of-hooks
    MenuList.find((i) => i.link === useLocation().pathname)?.title ||
    '';

  useEffect(() => {
    let beginTimer: NodeJS.Timer | null = null,
      endTimer: NodeJS.Timer | null = null,
      animateTimer: NodeJS.Timer | null = null;
    // quotes的index
    let i = 0;
    // 同步的text 因为setState是异步的 所以text并不是最新的text 此时需要一个同步的text表示最新的text
    let _text = '';
    const textAnimation = () => {
      // 字的index
      let idx = 0;
      beginTimer = setInterval(() => {
        _text += quotes[i][idx];
        setText(_text);
        if (++idx >= quotes[i].length) {
          beginTimer !== null && clearInterval(beginTimer);
          setFlash(true);
          animateTimer = setTimeout(() => {
            setFlash(false);
            endTimer = setInterval(() => {
              _text = _text.slice(0, _text.length - 1);
              setText(_text);
              if (_text.length === 0) {
                endTimer !== null && clearInterval(endTimer);
                if (++i >= quotes.length) {
                  i = 0;
                }
                textAnimation();
              }
            }, 100);
          }, 700);
        }
      }, 200);
    };
    quotes.length > 0 && blogType === BlogType.IMAGE && textAnimation();
    return () => {
      beginTimer !== null && clearInterval(beginTimer);
      endTimer !== null && clearInterval(endTimer);
      animateTimer !== null && clearTimeout(animateTimer);
    };
  }, [blogType, quotes]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const containerClass = () => {
    if (
      (blogType === BlogType.IMAGE && type === Type.HOME) ||
      blogType === BlogType.BACKGROUND
    ) {
      return styles.fullScreen;
    }
    return styles.remainScreen;
  };

  return (
    <>
      {blogType === BlogType.BACKGROUND && <div className={styles.webBg} />}
      {blogType === BlogType.IMAGE && (
        <div
          className={classNames(styles.topImg, {
            [styles.home]: type === Type.HOME,
          })}
          style={style}
        >
          {type === Type.PAGE && (
            <h1 className={classNames(styles.topContainer, styles.topTitle)}>
              {title}
            </h1>
          )}
          {type === Type.POST && (
            <div className={styles.topContainer}>
              <h1 className={styles.topTitle}>{post.title}</h1>
              <Meta
                sticky={false}
                tags={getTagsOrCategories(post.tags || [], tags)}
                categories={getTagsOrCategories(
                  post.categories || [],
                  categories,
                )}
                create_time={post.create_time}
                className={styles.meta}
              />
            </div>
          )}
          {type === Type.HOME && (
            <>
              <div className={styles.topContainer}>
                <h1 className={styles.topTitle}>{blogTitle}</h1>
                <span className={styles.text}>{text}</span>
                <span
                  className={classNames(styles.cursor, {
                    [styles.flash]: flash,
                  })}
                >
                  |
                </span>
              </div>
              <div
                className={styles.down}
                onClick={() => {
                  $('html').animate(
                    {
                      scrollTop: window.innerHeight,
                    },
                    300,
                  );
                }}
              >
                <i className="fa fa-lg fa-arrow-down" />
              </div>
            </>
          )}
        </div>
      )}
      <Header
        onMobileMenuClick={() => {
          setMobileSidebar(true);
        }}
        onSearchClick={() => {
          setSearch(true);
        }}
        direction={direction}
        distance={distance}
        className={''}
      />
      <MoblieSidebar
        visible={mobileSidebar}
        onMobileMaskClick={() => {
          setMobileSidebar(false);
        }}
      />
      <Search
        visible={search}
        onClose={() => {
          setSearch(false);
        }}
        onSearch={(val) => {
          if (!val) setResult([]);
          else
            setResult(
              allPosts.filter(
                (i) => i.title.includes(val) || i.content.includes(val),
              ),
            );
        }}
        result={result.map((i) => ({
          onClick: () => {
            history.push('/posts/' + i.id);
            setSearch(false);
          },
          name: i.title,
          content: i.content,
        }))}
      />
      <div
        className={classNames(styles.container, containerClass(), {
          [styles.noPadding]: blogType === BlogType.IMAGE,
        })}
      >
        <div className={styles.main}>
          <div className={styles.content}>{children}</div>
          <div className={styles.info}>
            <UserCard />
            <AnnouncementCard />
            <IsSticky
              top={direction === Direction.UP ? 70 : 15}
              enable={type === Type.POST}
            >
              {type === Type.POST && <DirectoryCard direction={direction} />}
              <PostCard />
              <CategoryCard />
              <TagCard />
              <ArchiveCard />
              <WebCard />
            </IsSticky>
          </div>
        </div>
        <Footer />
      </div>
      <Setting post={type === Type.POST} visble={distance > 0} />
    </>
  );
};

export default withRouter(Layout);
