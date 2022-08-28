import { useModel, history, Link } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';

import Image from '@/components/Image';
import { MenuList } from '../Header';
import Mask, { MaskType } from '../Mask';

import styles from './index.less';

type IProps = {
  visible?: boolean;
  onMobileMaskClick?: () => void;
};

const MoblieSidebar: React.FC<IProps> = ({ visible, onMobileMaskClick }) => {
  const {
    initialState = {
      userInfo: {
        avatar:
          'https://rmt.ladydaily.com/fetch/tzk/storage/20210620001140.png',
        name: '亮尔大大',
        description: '退开，我要开始装逼了',
        github: 'https://gitee.com/liang_er_da/',
        gitee: 'https://gitee.com/liang_er_da/',
      },
      postCount: 0,
      tags: [],
      categories: [],
    },
  } = useModel('@@initialState');

  const { userInfo = {}, tags = [], categories = [], postCount } = initialState;
  return (
    <div>
      {visible && <Mask onClick={onMobileMaskClick} type={MaskType.MOBILE} />}
      <div
        className={styles.mobileSidebar}
        style={{ right: visible ? '0' : '-250px' }}
      >
        <Image
          className={classNames(styles.avatar, 'roate')}
          src={userInfo.avatar}
        />
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
        <hr />
        <ul className={styles.menu}>
          {MenuList.map((i) => (
            <li key={i.title} className={styles.menuItem}>
              <Link to={i.link} className={styles.menuItemLink}>
                <i className={classNames(styles.icon, i.icon)} />
                <span>{i.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(MoblieSidebar);
