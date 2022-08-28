import { history } from 'umi';
import React from 'react';
import classNames from 'classnames';

import Image from '@/components/Image';

import styles from './index.less';

const NoFound: React.FC = () => {
  return (
    <div className={styles.notFoundWarp}>
      <div className={classNames(styles.postItem, 'card cover_img_box')}>
        <span className={classNames(styles.coverImg)}>
          <Image className="cover_img" />
        </span>
        <div className={styles.postInfo}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.desc}>Page Not Found</p>
          <div
            className={classNames(styles.backHome, 'link h-color-btn')}
            onClick={() => {
              history.push('/');
            }}
          >
            <i className="fa fa-rocket" />
            <span className={styles.goHomeText}>回到主页</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFound;
