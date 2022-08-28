import React, { useState, memo } from 'react';
import classNames from 'classnames';

import errImg from './assets/404.jpg';
import styles from './index.less';

type IProps = {
  src?: string;
  className?: string;
  alt?: string;
};

const Image: React.FC<IProps> = ({
  src = errImg,
  className = '',
  alt = '',
}) => {
  const [loading, setState] = useState(styles.loading);

  return (
    <img
      src={src || errImg}
      alt={alt}
      className={classNames(className, loading)}
      onLoad={() => {
        setState(styles.loaded);
      }}
      onError={(e) => {
        //@ts-ignore
        e.target.onerror = null;
        //@ts-ignore
        e.target.src = errImg;
      }}
    />
  );
};

export default memo(Image);
