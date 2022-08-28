import { Link, useModel } from 'umi';
import { memo } from 'react';

import { color16, fontSize } from '@/utils';
import CardLoading from '../LoadingCard';

import styles from './index.less';
import type { CategoryOrTag } from '@/http/api';

const TagCard: React.FC = () => {
  const { initialState = { tags: [] } } = useModel('@@initialState');
  const { tags = [] } = initialState;

  return (
    <CardLoading
      cardProps={{
        label: '标签',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-tags font-b" />,
      }}
    >
      {tags.length > 0 && (
        <div className={styles.tag}>
          {tags.map((i: CategoryOrTag) => (
            <Link
              to={`/tags/${i.id}?title=${i.name}`}
              className={styles.tagItem}
              key={i.id}
              style={{
                color: color16(),
                fontSize: fontSize(),
              }}
            >
              {i.name}
            </Link>
          ))}
        </div>
      )}
    </CardLoading>
  );
};

export default memo(TagCard);
