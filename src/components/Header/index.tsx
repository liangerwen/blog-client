import { Link, useModel } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';

import { Direction } from '@/hooks/useScroll';
import { BlogType, getBlogType } from '@/utils';

import styles from './index.less';

type IProps = {
  onMobileMenuClick?: () => void;
  onSearchClick?: () => void;
  direction: Direction;
  distance: number;
  className?: string;
};

export const MenuList = [
  {
    title: '首页',
    link: '/',
    icon: 'fa fa-fw fa-home',
  },
  {
    title: '归档',
    link: '/archives',
    icon: 'fa fa-fw fa-archive',
  },
  {
    title: '标签',
    link: '/tags',
    icon: 'fa fa-fw fa-tags',
  },
  {
    title: '分类',
    link: '/categories',
    icon: 'fa fa-fw fa-folder-open',
  },
  // {
  //   title: '关于',
  //   link: '/about',
  //   icon: 'fa fa-fw fa-heart',
  // },
  // {
  //   title: '留言',
  //   link: '/message',
  //   icon: 'fa fa-fw fa-coffee',
  // },
];

enum HeaderEnum {
  NONE = 0,
  HIDE = styles.hide,
  SHOW = styles.show,
}

const Header: React.FC<IProps> = ({
  onMobileMenuClick,
  onSearchClick,
  direction,
  distance,
  className = '',
}) => {
  const { initialState = { type: getBlogType(), title: '' } } =
    useModel('@@initialState');
  const { type: blogType, title } = initialState;

  return (
    <header
      className={classNames(
        styles.header,
        className,
        direction === Direction.DOWN && distance > 0
          ? HeaderEnum.HIDE
          : HeaderEnum.SHOW,
        {
          [styles.transparent]: blogType === BlogType.IMAGE && distance <= 0,
        },
      )}
    >
      <div className={styles.logo}>
        <Link to="/" className={styles.logoTitle}>
          {title}
        </Link>
      </div>
      <ul className={styles.menu}>
        <li
          className={classNames(styles.menuItem, 'link')}
          onClick={() => {
            onSearchClick?.();
          }}
        >
          <i className={classNames(styles.icon, 'fa fa-fw fa-search')} />
          搜索
        </li>
        {MenuList.map((i) => (
          <li key={i.title} className={styles.menuItem}>
            <Link to={i.link} className={styles.menuItemLink}>
              <i className={classNames(styles.icon, i.icon)} />
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
      <i
        className={classNames(styles.mobileMenu, 'fa fa-fw fa-bars link')}
        onClick={() => {
          onMobileMenuClick?.();
        }}
      />
      <i
        className={classNames(
          styles.mobileMenu,
          styles.icon,
          'fa fa-fw fa-search link',
        )}
        onClick={() => {
          onSearchClick?.();
        }}
      />
    </header>
  );
};

export default memo(Header);
