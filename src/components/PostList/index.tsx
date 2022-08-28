import { useModel } from 'umi';
import React, { memo } from 'react';

import type { CategoryOrTag, IPostItem } from '@/http/api';
import PostItem from './components/PostItem';

import styles from './index.less';

type IProps = {
  data?: IPostItem[];
};

export const getTagsOrCategories = (ids: number[], data: CategoryOrTag[]) => {
  return data.filter((i) => ids.includes(i.id));
};

const PostList: React.FC<IProps> = ({ data = [] }) => {
  const { initialState = { categories: [], tags: [] } } =
    useModel('@@initialState');
  const { categories = [], tags = [] } = initialState;

  return (
    <div className={styles.postList}>
      {data.map((i, index) => (
        <PostItem
          {...i}
          right={index % 2 === 1}
          key={i.id}
          tags={getTagsOrCategories(i.tags || [], tags)}
          categories={getTagsOrCategories(i.categories || [], categories)}
        />
      ))}
    </div>
  );
};

export default memo(PostList);
