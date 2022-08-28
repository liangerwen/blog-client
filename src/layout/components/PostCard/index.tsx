import { Link, useModel } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import Image from '@/components/Image';
import CardLoading from '../LoadingCard';
import type { IPostItem } from '@/http/api';

import styles from './index.less';

const PostCard: React.FC = () => {
  const { initialState = { newPosts: [] } } = useModel('@@initialState');
  const { newPosts = [] } = initialState;

  return (
    <CardLoading
      cardProps={{
        label: '最新文章',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-history font-b" />,
      }}
    >
      {newPosts.length > 0 &&
        newPosts.map((i: IPostItem) => (
          <Link
            to={`/posts/${i.id}`}
            className={classNames(styles.postItem, 'link')}
            key={i.id}
          >
            <div className={styles.postImg}>
              <Image src={i.cover_img} alt="" className="cover_img" />
            </div>
            <div className={styles.postInfo}>
              <span className={styles.postTitle}>{i.title}</span>
              <span className={styles.postDate}>
                {dayjs(i.create_time).format('YYYY-MM-DD')}
              </span>
            </div>
          </Link>
        ))}
    </CardLoading>
  );
};

export default memo(PostCard);
