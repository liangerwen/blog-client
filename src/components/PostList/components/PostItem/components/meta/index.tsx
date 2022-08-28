import { Link } from 'umi';
import React, { Fragment, memo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import type { CategoryOrTag } from '@/http/api';
import styles from './index.less';

// type Category = { id: number; name: string; children: Category | null };

type IProps = {
  create_time: Date | string;
  tags?: CategoryOrTag[];
  categories?: CategoryOrTag[];
  sticky?: boolean;
  className?: string;
};

const Meta: React.FC<IProps> = ({
  create_time,
  tags,
  categories,
  sticky,
  className,
}) => {
  const renderStick = (isSticky?: boolean) =>
    isSticky && (
      <div className={classNames(styles.meta, className)}>
        <i className={classNames(styles.sticky, 'fa fa-thumb-tack fa-fs')} />
        <span className={styles.sticky}>置顶</span>
        <span className={styles.hr}>|</span>
      </div>
    );

  const renderDate = (createTime: Date | string) => (
    <div className={classNames(styles.meta, className)}>
      <i className="fa fa-calendar fa-fs" />
      <span className={styles.divider}>发表于</span>
      <span>{dayjs(createTime).format('YYYY-MM-DD')}</span>
    </div>
  );

  // const renderCategories = (category?: Category) => {
  //   const renderItem = (category: Category): React.ReactElement => {
  //     return (
  //       <>
  //         <Link to={'/categories/' + category.id}>{category.name}</Link>
  //         {category.children && (
  //           <>
  //             <i
  //               className={classNames(
  //                 styles.divider,
  //                 'fa fa-angle-right fa-fs',
  //               )}
  //             ></i>
  //             {renderItem(category.children)}
  //           </>
  //         )}
  //       </>
  //     );
  //   };
  //   return (
  //     category && (
  //       <div className={classNames(styles.meta, className)}>
  //         <span className={styles.hr}>|</span>
  //         <i className="fa fa-inbox fa-fs"></i>
  //         <span className={styles.divider}>分类</span>
  //         {renderItem(category)}
  //       </div>
  //     )
  //   );
  // };

  const renderTagsOrCategories = (
    data: CategoryOrTag[],
    type: 'tags' | 'categories',
  ) => {
    return (
      data &&
      data.length > 0 && (
        <div className={classNames(styles.meta, className)}>
          <span className={styles.hr}>|</span>
          <i
            className={classNames(
              'fa fa-fs',
              type === 'tags' ? 'fa-tags' : 'fa-inbox',
            )}
          />
          <span className={styles.divider}>
            {type === 'tags' ? '标签' : '分类'}
          </span>
          {data.map((i, index) => {
            if (index === data.length - 1) {
              return (
                <Link to={`/${type}/${i.id}?title=${i.name}`} key={i.id}>
                  {i.name}
                </Link>
              );
            }
            return (
              <Fragment key={i.id}>
                <Link to={`/${type}/${i.id}?title=${i.name}`}>{i.name}</Link>
                <span className={styles.divider}>•</span>
              </Fragment>
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className={classNames(styles.meta, className)}>
      {renderStick(sticky)}
      {renderDate(create_time)}
      {renderTagsOrCategories(tags || [], 'tags')}
      {renderTagsOrCategories(categories || [], 'categories')}
    </div>
  );
};

export default memo(Meta);
