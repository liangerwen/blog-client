import type { IRouteComponentProps } from 'umi';
import { history, Link } from 'umi';
import { useState, useEffect, memo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { LoadingContainer } from '@/components/Loading';
import Image from '@/components/Image';
import Pagination from '@/components/Pagination';
import Card from '@/components/Card';
import { HttpCode } from '@/http';
import type { YearArchivesType } from '@/http/api';
import { getArchivesByYear } from '@/http/api';

import styles from './index.less';

const Archives: React.FC<IRouteComponentProps<{ page: string }>> = (props) => {
  const [archives, setArchives] = useState<YearArchivesType>({
    total: 0,
    list: [],
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(props.match.params.page || 1));

  const fetchArchives = () => {
    getArchivesByYear(page)
      .then((res) => {
        if (res.code === HttpCode.SUCCESS) {
          setArchives(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArchives();
  }, [page]);

  return (
    <Card>
      <div className={styles.archiveTitle}>
        文章总览{loading ? '' : ' - ' + archives.total}
      </div>
      <LoadingContainer loading={loading}>
        {archives.list.map((i) => (
          <div className={styles.archive} key={i.date}>
            <div className={classNames(styles.archiveItem, styles.year)}>
              {dayjs(i.date).format('YYYY')}
            </div>
            {i.posts.map((ii) => (
              <div className={styles.archiveItem} key={ii.id}>
                <Link to={'/posts/' + ii.id} className={styles.coverImg}>
                  <Image src={ii.cover_img} className="cover_img" />
                </Link>
                <div className={styles.archiveItemInfo}>
                  <p className={styles.archiveItemTime}>
                    <i className="fa fa-mr fa-calendar" />
                    {dayjs(ii.create_time).format('YYYY-MM-DD')}
                  </p>
                  <Link
                    to={'/posts/' + ii.id}
                    className={styles.archiveItemTitle}
                  >
                    {ii.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
        <Pagination
          currentPage={page}
          total={archives.total}
          onPageChange={(p) => {
            setPage(p);
            history.push('/archives/page/' + p);
          }}
        />
      </LoadingContainer>
    </Card>
  );
};

export default memo(Archives);
