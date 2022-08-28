/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import type { IRouteComponentProps } from 'umi';
import { Link, useModel, history } from 'umi';
import Valine from 'valine';
// @ts-ignore
import QRCode from 'qrcode.react';

import { LoadingContainer } from '@/components/Loading';
import { getTagsOrCategories } from '@/components/PostList';
import Image from '@/components/Image';
import Meta from '@/components/PostList/components/PostItem/components/meta';
import { BlogType, getBlogType } from '@/utils';
import { HttpCode } from '@/http';
import type { IPostItem } from '@/http/api';
import { getPostDetail } from '@/http/api';

import mdParser from './md.config';
import { copyListener, expandListener, scrollListener } from './listener';
import './index.less';
import classNames from 'classnames';

const Post: React.FC<IRouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id },
  },
}) => {
  const {
    initialState = {
      userInfo: { name: '' },
      categories: [],
      tags: [],
      directory: [],
      type: getBlogType(),
      config: { alipay_exceptional: '', wx_exceptional: '' },
    },
    setInitialState,
  } = useModel('@@initialState');
  const {
    categories,
    tags,
    userInfo,
    type,
    config: { alipay_exceptional, wx_exceptional },
  } = initialState;
  const [post, setPost] = useState<IPostItem>({
    id: '',
    cover_img: '',
    title: '',
    content: '',
    create_time: new Date(),
    tags: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = useCallback(() => {
    setLoading(true);
    getPostDetail(id)
      .then((res) => {
        if (res.code === HttpCode.SUCCESS) {
          if (res.data.id) {
            setPost(res.data);
            const matchRegStr = `<h([1-6]) class="directory_title" id="([^\n]+)">([^\n]+)<\/h[1-6]>\n`;
            const directory =
              mdParser
                .render(res.data.content)
                .match(new RegExp(matchRegStr, 'g'))
                ?.map((i) => {
                  const replaceReg = new RegExp(`^${matchRegStr}$`);
                  const titleId = i.replace(replaceReg, '$2');
                  const level = Number(i.replace(replaceReg, '$1'));
                  const content = i.replace(replaceReg, '$3');
                  return { id: titleId, level, content };
                }) || [];
            // @ts-ignore
            setInitialState({ ...initialState, directory, post: res.data });
          } else {
            history.push('/404');
          }
        } else {
          history.push('/404');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchPostDetail();
    new Valine({
      el: '#vcomments',
      appId: 'clc3rAoSX699yxgRedbmit8X-gzGzoHsz',
      appKey: 'lkTWxE8nXCAKEfa9usNoogs9',
      placeholder: '说点什么吧...',
      avatar: 'robohash',
      visitor: true,
      recordIP: true,
      enableQQ: true,
      path: `/posts/${id}`,
    });
    return () => {
      // @ts-ignore
      setInitialState({ ...initialState, directory: null, post: {} });
    };
  }, [fetchPostDetail]);

  useEffect(() => {
    let unbindCopy: (() => void) | null = null;
    let unbindExpand: (() => void) | null = null;
    let unbindScroll: (() => void) | null = null;
    $(() => {
      unbindCopy = copyListener();
      unbindExpand = expandListener();
      unbindScroll = scrollListener();
      unbindScroll = scrollListener();
    });
    return () => {
      unbindCopy?.();
      unbindExpand?.();
      unbindScroll?.();
    };
  }, [post]);

  return (
    <div
      className={classNames('post card', {
        innerTitle: type === BlogType.BACKGROUND,
      })}
    >
      <LoadingContainer loading={loading}>
        {type === BlogType.BACKGROUND && (
          <>
            <h1 className="title">{post.title}</h1>
            <div className="meta">
              <Meta
                sticky={true}
                tags={getTagsOrCategories(post.tags || [], tags)}
                categories={getTagsOrCategories(
                  post.categories || [],
                  categories,
                )}
                create_time={post.create_time}
              />
            </div>
          </>
        )}
        <div
          id="article-container"
          dangerouslySetInnerHTML={{ __html: mdParser.render(post.content) }}
        />
      </LoadingContainer>
      <div className="copyright fa-fb">
        <div className="post-copyright">
          <span className="post-copyright-meta">文章作者:</span>
          <span className="post-copyright-info">
            <a href="mailto:1354383179@qq.com">{userInfo.name}</a>
          </span>
        </div>
        <div className="post-copyright">
          <span className="post-copyright-meta">文章链接:</span>
          <span className="post-copyright-info">
            <a href={window.location.href}>{window.location.href}</a>
          </span>
        </div>
        <div className="post-copyright">
          <span className="post-copyright-meta">版权声明:</span>
          <span className="post-copyright-info">
            本博客所有文章除特别声明外，均采用
            <a href={window.location.href} target="_blank" rel="noreferrer">
              CC BY-NC-SA 4.0
            </a>
            许可协议。转载请注明来自
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              liangerwen&apos;s☻Blog
            </a>
            ！
          </span>
        </div>
      </div>
      <div className="share">
        <div className="tags-share">
          {getTagsOrCategories(post.tags || [], tags).map((i) => (
            <Link
              to={`/tags/${i.id}?title=${i.name}`}
              className="tag-item"
              key={i.id}
            >
              {i.name}
            </Link>
          ))}
          {getTagsOrCategories(post.categories || [], categories).map((i) => (
            <Link
              to={`/categories/${i.id}?title=${i.name}`}
              className="tag-item"
              key={i.id}
            >
              {i.name}
            </Link>
          ))}
        </div>
        <div className="post-share">
          <a
            className="fa fa-fw fa-weibo icon"
            target="_blank"
            href={`https://service.weibo.com/share/share.php?url=${window.location.href}&title=${post.title}&pic=${post.cover_img}`}
            rel="noreferrer"
          />
          <a
            className="fa fa-fw fa-qq icon"
            target="_blank"
            href={`https://connect.qq.com/widget/shareqq/index.html?url=${window.location.href}`}
            rel="noreferrer"
          />
          <i className="fa fa-fw fa-wechat icon link">
            <div className="wechat-share">
              <p className="wechat-share__title">微信扫一扫分享</p>
              <QRCode value={window.location.href} className="qrcode" />
              <p>微信里点“发现”，扫一下，二维码便可将本文分享至朋友圈。</p>
            </div>
          </i>
        </div>
      </div>
      <div className="exceptional">
        <div className="exceptional-btn h-color-btn link">
          <i className="fa fa-fw fa-qrcode" />
          打赏
        </div>
        <div className="exceptional-qrcode">
          <div>
            <Image src={wx_exceptional} className="pay-qrcode wechat-pay" />
            <p>微信</p>
          </div>
          <div>
            <Image src={alipay_exceptional} className="pay-qrcode alipay-pay" />
            <p>支付宝</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="comment-warp">
        <div className="comment-title">
          <i className="fa fa-fw fa-comments" />
          <span>评论</span>
        </div>
        <div id="vcomments" />
      </div>
    </div>
  );
};

export default Post;
