import React, { useState } from 'react';
import Dialog from 'rc-dialog';
import classNames from 'classnames';

import mdParser from '@/pages/Post/md.config';
import { html2str } from '@/utils';
import styles from './index.less';

type IProps = {
  visible?: boolean;
  onSearch?: (val: string) => void;
  onClose?: () => void;
  title?: string;
  result?: { onClick?: () => void; name: string; content: string }[];
};

const Search: React.FC<IProps> = ({
  visible = false,
  title = '文章搜索',
  result = [],
  onClose,
  onSearch,
}) => {
  const [search, setSearch] = useState('');

  const resultTextRender = (name: string) => {
    const res = name.split(search);
    return (
      <>
        {res.map((i, idx) => {
          return idx === res.length - 1 ? (
            i
          ) : (
            <>
              {i}
              <span className={styles.searchActive}>{search}</span>
            </>
          );
        })}
      </>
    );
  };

  const getContentActiveText = (content: string) => {
    const text = html2str(mdParser.render(content));
    const index = text.indexOf(search);
    if (index > 20) {
      return text.slice(index - 20);
    }
    return text;
  };

  return (
    <Dialog
      title={<h3 className={styles.searchTitle}>{title}</h3>}
      zIndex={888}
      visible={visible}
      closable={true}
      closeIcon={<i className="fa fa-lg fa-close" />}
      footer={<></>}
      maskClosable={true}
      keyboard={true}
      className={styles.search}
      wrapClassName={styles.warp}
      maskAnimation="fade"
      animation="rezoom"
      onClose={() => {
        onClose?.();
      }}
    >
      <div className={styles.modalContent}>
        <input
          type="text"
          className={styles.searchInput}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
        <hr />
        <div className={styles.searchResult}>
          {result.map((i) => (
            <p
              className={classNames(styles.resultItem, 'link')}
              key={i.name}
              onClick={() => {
                i.onClick?.();
              }}
            >
              <p className={styles.resultItemTitle}>
                {resultTextRender(i.name)}
              </p>
              <p className={styles.resultItemContent}>
                {resultTextRender(getContentActiveText(i.content))}
              </p>
            </p>
          ))}
          {search && !result.length && <p>找不到您查詢的內容：{search}</p>}
        </div>
      </div>
    </Dialog>
  );
};

export default Search;
