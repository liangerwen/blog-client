import { Link, useModel } from 'umi';
import { useEffect, useState } from 'react';

import Card from '@/components/Card';
import { LoadingContainer } from '@/components/Loading';

import styles from './index.less';
import type { CategoryOrTag } from '@/http/api';
import { getCategories } from '@/http/api';
import { HttpCode } from '@/http';

const Categories: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {
    initialState = {
      categories: [],
    },
    setInitialState,
  } = useModel('@@initialState');
  const { categories = [] } = initialState;

  useEffect(() => {
    getCategories()
      .then((res) => {
        if (res.code === HttpCode.SUCCESS) {
          // @ts-ignore
          setInitialState({ ...initialState, categories: res.data });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card
      label={`分类${loading ? '' : ' - ' + categories.length}`}
      labelClass={styles.cardLabel}
    >
      <LoadingContainer loading={loading}>
        <ul className={styles.categoty}>
          {categories.map((i: CategoryOrTag) => (
            <li className={styles.categoryItem} key={i.id}>
              <Link
                to={`/categories/${i.id}?title=${i.name}`}
                className={styles.categoryItemLink}
                key={i.id}
              >
                {i.name}
              </Link>
              <span className={styles.categoryItemCount}>({i.count})</span>
            </li>
          ))}
        </ul>
      </LoadingContainer>
    </Card>
  );
};

export default Categories;
