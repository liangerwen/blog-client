import classNames from 'classnames';
import React, { memo, useMemo } from 'react';

import styles from './index.less';

type IProps = {
  currentPage?: number;
  total: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<IProps> = ({
  currentPage = 1,
  total,
  limit = 10,
  onPageChange,
  className,
}) => {
  const pageSize = useMemo(() => {
    const _total = Math.floor(total);
    const remainder = _total % limit;
    return remainder === 0 ? _total / limit : Math.floor(_total / limit) + 1;
  }, [total]);

  return pageSize > 0 ? (
    <div className={classNames(styles.pagination, className)}>
      {/* 上一页 与 第一页*/}
      {currentPage > 1 && (
        <>
          <span
            className={classNames(styles.page, 'link')}
            onClick={() => {
              onPageChange?.(currentPage - 1);
            }}
          >
            <i className="fa fa-angle-left fa-lg" />
          </span>
          <span
            className={classNames(styles.page, 'link')}
            onClick={() => {
              onPageChange?.(1);
            }}
          >
            1
          </span>
        </>
      )}
      {/* 第一页与当前页前一页的省略号 */}
      {currentPage > 3 && (
        <span
          className={classNames(
            styles.page,
            styles.leftOmit,
            styles.omit,
            'link fa',
          )}
          onClick={() => {
            onPageChange?.(currentPage - 5 > 1 ? currentPage - 5 : 1);
          }}
        />
      )}
      {/* 当前页前一页 */}
      {currentPage > 2 && (
        <span
          className={classNames(styles.page, 'link')}
          onClick={() => {
            onPageChange?.(currentPage - 1);
          }}
        >
          {currentPage - 1}
        </span>
      )}
      {/* 当前页 */}
      <span className={classNames(styles.page, styles.active)}>
        {currentPage}
      </span>
      {/* 当前页后一页 */}
      {currentPage < pageSize - 1 && (
        <span
          className={classNames(styles.page, 'link')}
          onClick={() => {
            onPageChange?.(currentPage + 1);
          }}
        >
          {currentPage + 1}
        </span>
      )}
      {/* 第一页与当前页前一页的省略号 */}
      {currentPage < pageSize - 2 && (
        <span
          className={classNames(
            styles.page,
            styles.rightOmit,
            styles.omit,
            'link fa',
          )}
          onClick={() => {
            onPageChange?.(
              currentPage + 5 < pageSize ? currentPage + 5 : pageSize,
            );
          }}
        />
      )}
      {/* 下一页 */}
      {currentPage < pageSize && (
        <>
          <span
            className={classNames(styles.page, 'link')}
            onClick={() => {
              onPageChange?.(pageSize);
            }}
          >
            {pageSize}
          </span>
          <span
            className={classNames(styles.page, 'link')}
            onClick={() => {
              onPageChange?.(currentPage + 1);
            }}
          >
            <i className="fa fa-angle-right fa-lg" />
          </span>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default memo(Pagination);
