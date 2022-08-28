import React from 'react';
import styles from './index.less';

const Loading: React.FC = () => {
  return (
    <div className={styles.spinnerWarp}>
      <div className={styles.spinner}>
        <div className={styles.rect1} />
        <div className={styles.rect2} />
        <div className={styles.rect3} />
      </div>
      <p className={styles.loadingText}>加载中...</p>
    </div>
  );
};

export default Loading;

type IProps = {
  loading?: boolean;
};

export const LoadingContainer: React.FC<IProps> = ({
  children,
  loading = true,
}) => <>{loading ? <Loading /> : children}</>;
