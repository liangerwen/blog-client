import { useModel } from 'umi';
import { memo } from 'react';

import CardLoading from '../LoadingCard';

import styles from './index.less';

const WebCard: React.FC = () => {
  const {
    initialState = {
      webInfo: {
        postCount: 0,
        runtime: 0,
        visitors: 0,
        views: 0,
      },
    },
  } = useModel('@@initialState');
  const { webInfo = {} } = initialState;

  return (
    <CardLoading
      cardProps={{
        label: '网站资讯',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-line-chart font-b" />,
      }}
    >
      <div className={styles.webInfo}>
        <div className={styles.webItem}>
          <span>文章数量：</span>
          <span>{webInfo.postCount}</span>
        </div>
        <div className={styles.webItem}>
          <span>已运行时间：</span>
          <span>{webInfo.runtime}天</span>
        </div>
        <div className={styles.webItem}>
          <span>本站访客数：</span>
          <span>{webInfo.visitors}</span>
        </div>
        <div className={styles.webItem}>
          <span>本站总访问量：</span>
          <span>{webInfo.views}</span>
        </div>
      </div>
    </CardLoading>
  );
};

export default memo(WebCard);
