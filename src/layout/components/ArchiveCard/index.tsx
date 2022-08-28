import { Link, useModel } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import type { ArchivesType } from '@/http/api';
import CardLoading from '../LoadingCard';
import styles from './index.less';

const ArchiveCard: React.FC = () => {
  const { initialState = { archives: [] } } = useModel('@@initialState');
  const { archives = [] } = initialState;

  return (
    <CardLoading
      cardProps={{
        label: '归档',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-archive font-b" />,
      }}
    >
      {archives.length > 0 && (
        <div className={styles.archive}>
          {archives.map(
            (i: ArchivesType) =>
              i.posts.length > 0 && (
                <Link
                  to={`/archives/${i.date}?title=${dayjs(i.date).format(
                    'YYYY年MM月',
                  )}`}
                  className={classNames(styles.archiveItem, 'link')}
                  key={i.date}
                >
                  <span>{dayjs(i.date).format('YYYY年MM月')}</span>
                  <span>{i.posts.length}</span>
                </Link>
              ),
          )}
        </div>
      )}
    </CardLoading>
  );
};

export default memo(ArchiveCard);
