import { Link, useModel } from 'umi';
import { memo } from 'react';
import classNames from 'classnames';

import type { CategoryOrTag } from '@/http/api';
import CardLoading from '../LoadingCard';
import styles from './index.less';

const CategoryCard: React.FC = () => {
  const { initialState = { categories: [] } } = useModel('@@initialState');
  const { categories = [] } = initialState;

  return (
    <CardLoading
      cardProps={{
        label: '分类',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-folder-open font-b" />,
      }}
    >
      <div className={styles.category}>
        {categories.map((i: CategoryOrTag) => (
          <Link
            to={`/categories/${i.id}?title=${i.name}`}
            className={classNames(styles.categoryItem, 'link')}
            key={i.id}
          >
            <span>{i.name}</span>
            <span>{i.count}</span>
          </Link>
        ))}
      </div>
    </CardLoading>
  );
};

export default memo(CategoryCard);
