import { Link, useModel } from 'umi';
import { useEffect, useState } from 'react';

import Card from '@/components/Card';
import { LoadingContainer } from '@/components/Loading';
import { color16, fontSize } from '@/utils';

import styles from './index.less';
import { CategoryOrTag, getTags } from '@/http/api';
import { HttpCode } from '@/http';

const Tags: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {
    initialState = {
      tags: [],
    },
    setInitialState,
  } = useModel('@@initialState');
  const { tags = [] } = initialState;

  useEffect(() => {
    getTags()
      .then((res) => {
        if (res.code === HttpCode.SUCCESS) {
          // @ts-ignore
          setInitialState({ ...initialState, tags: res.data });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card
      label={`标签${loading ? '' : ' - ' + tags.length}`}
      labelClass={styles.cardLabel}
    >
      <LoadingContainer loading={loading}>
        <div className={styles.tag}>
          {tags.map((i: CategoryOrTag) => (
            <Link
              to={`/tags/${i.id}?title=${i.name}`}
              className={styles.tagItem}
              key={i.id}
              style={{
                color: color16(),
                fontSize: fontSize(12),
              }}
            >
              {i.name}
            </Link>
          ))}
        </div>
      </LoadingContainer>
    </Card>
  );
};

export default Tags;
