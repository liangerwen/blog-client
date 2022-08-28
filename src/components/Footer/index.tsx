import { memo } from 'react';

import styles from './index.less';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerDesc}>
        <a
          href="https://github.com/jerryc127/hexo-theme-butterfly"
          target="_blank"
          rel="noreferrer"
        >
          主题 | Butterfly
        </a>
      </p>
      <p className={styles.footerDesc}>
        Copyright ©2021 - {new Date().getFullYear()} By 亮尔大大
      </p>
    </footer>
  );
};

export default memo(Footer);
