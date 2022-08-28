import { useModel, history } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';

import { addToBookmark } from '@/utils/bookmark';
import Image from '@/components/Image';
import CardLoading from '../LoadingCard';

import styles from './index.less';

const UserCard: React.FC = () => {
  const {
    initialState = {
      userInfo: {
        avatar: '',
        name: '',
        description: '',
        github: '',
        gitee: '',
      },
      postCount: 0,
      tags: [],
      categories: [],
    },
  } = useModel('@@initialState');

  const { userInfo = {}, tags = [], categories = [], postCount } = initialState;

  return (
    <CardLoading
      cardProps={{ className: classNames(styles.userInfo, 'mpcard') }}
    >
      <Image
        className={classNames(styles.avatar, 'roate')}
        src={userInfo.avatar}
      />
      <p className={styles.name}>{userInfo.name}</p>
      <p>{userInfo.description}</p>
      <div className={styles.actions}>
        <div
          className={classNames(styles.actionItem, 'link')}
          onClick={() => {
            history.push('/archives');
          }}
        >
          <span>文章</span>
          <span className={styles.count}>{postCount}</span>
        </div>
        <div
          className={classNames(styles.actionItem, 'link')}
          onClick={() => {
            history.push('/tags');
          }}
        >
          <span>标签</span>
          <span className={styles.count}>{tags.length}</span>
        </div>
        <div
          className={classNames(styles.actionItem, 'link')}
          onClick={() => {
            history.push('/categories');
          }}
        >
          <span>分类</span>
          <span className={styles.count}>{categories.length}</span>
        </div>
      </div>
      <div
        className={classNames(styles.bookmark, 'link h-color-btn')}
        onClick={() => {
          addToBookmark();
        }}
      >
        添加书签
      </div>
      {userInfo.github && (
        <div className={styles.links}>
          {userInfo.github && (
            <a href={userInfo.github} target="_blank" rel="noreferrer">
              <i className="fa-github fa fa-lg link h-roate" />
            </a>
          )}
          {userInfo.gitee && (
            <a href={userInfo.gitee} target="_blank" rel="noreferrer">
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(styles.icon, 'link h-roate')}
              >
                <defs>
                  <style type="text/css" />
                </defs>
                <path
                  d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z"
                  p-id="2129"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </CardLoading>
  );
};

export default memo(UserCard);
