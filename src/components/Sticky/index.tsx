import React from 'react';

import styles from './index.less';

type IProps = {
  top?: number;
};

const Sticky: React.FC<IProps> = ({ children, top = 0 }) => {
  return (
    <div className={styles.sticky} style={{ top: top + 'px' }}>
      {children}
    </div>
  );
};

export default Sticky;
