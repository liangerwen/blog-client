import classNames from 'classnames';
import React, { useEffect } from 'react';

import styles from './index.less';

export enum MaskType {
  MOBILE,
  PC,
  ALL,
}
type IProps = {
  type?: MaskType;
  onClick?: () => void;
};

const Mask: React.FC<IProps> = ({ type = MaskType.ALL, onClick }) => {
  useEffect(() => {
    $('body').addClass(styles.overflowHidden);
    return () => {
      $('body').removeClass(styles.overflowHidden);
    };
  }, []);
  return (
    <div
      className={classNames(
        styles.mask,
        { [styles.mobileMask]: type === MaskType.MOBILE },
        { [styles.mobilePc]: type === MaskType.PC },
      )}
      onClick={() => {
        onClick?.();
      }}
    />
  );
};

export default Mask;
