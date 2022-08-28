import { useModel } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';

import CardLoading from '../LoadingCard';
import styles from './index.less';

const AnnouncementCard: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <CardLoading
      cardProps={{
        label: '公告',
        className: 'mpcard',
        icon: (
          <i
            className={classNames(
              styles.breathing,
              'fa fa-fw fa-bullhorn font-b',
            )}
          />
        ),
      }}
    >
      {initialState?.announcement && <span>{initialState?.announcement}</span>}
    </CardLoading>
  );
};

export default memo(AnnouncementCard);
