import React, { memo } from 'react';
import { Link } from 'umi';
import classNames from 'classnames';

import Image from '@/components/Image';
import type { CategoryOrTag } from '@/http/api';
import Meta from './components/meta';
import mdParser from '@/pages/Post/md.config';
import { html2str } from '@/utils';

import styles from './index.less';

// type Category = { id: number; name: string; children: Category | null };

type IProps = {
  id: number | string;
  cover_img: string;
  title: string;
  content: string;
  create_time: Date | string;
  sticky?: boolean;
  tags?: CategoryOrTag[];
  categories?: CategoryOrTag[];
  right?: boolean;
};

const PostItem: React.FC<IProps> = ({
  id,
  cover_img,
  title,
  content,
  sticky = false,
  create_time,
  tags,
  categories,
  right = false,
}) => {
  return (
    <div
      className={classNames(
        styles.postItem,
        { [styles.noCover]: !cover_img },
        'card cover_img_box',
      )}
    >
      {cover_img && (
        <Link
          to={'/posts/' + id}
          className={classNames(styles.coverImg, {
            [styles.right]: right,
          })}
        >
          <Image src={cover_img} className="cover_img" />
        </Link>
      )}
      <div className={styles.postInfo}>
        <Link to={'/posts/' + id} className={styles.postTitle}>
          {title}
        </Link>
        <Meta {...{ sticky, create_time, tags, categories }} />
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{
            __html: html2str(mdParser.render(content)),
          }}
        />
      </div>
    </div>
  );
};

export default memo(PostItem);
