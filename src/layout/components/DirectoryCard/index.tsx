import { useModel } from 'umi';
import { useState, useEffect, Fragment, memo, useMemo } from 'react';
import cloneDeep from 'lodash.clonedeep';

import { Direction } from '@/hooks/useScroll';
import { linkClickListener } from '@/pages/Post/listener';
import CardLoading from '../LoadingCard';

import './index.less';

export type IDirectoryItem = {
  prefix: string | number;
  level: number;
  children: IDirectoryItem[];
  parentId: number | undefined;
  id: number;
  content: string;
};

const directoryTree = (directory: IDirectoryItem[] | null) => {
  if (!Array.isArray(directory) || directory.length === 0) {
    return;
  }
  let p = directory[0];
  for (let i = 1; i < directory.length; i++) {
    if (directory[i].level > p.level) {
      directory[i].parentId = p.id;
    }
    p = directory[i];
  }
  const s = directory.filter(
    (i) => !i.parentId && i.level != directory[0].level,
  );
  if (s.length > 0) {
    directoryTree(directory.filter((i) => !i.parentId));
  }
};
const addPrefix = (
  directory: IDirectoryItem[],
  deep = 1,
  parentPrefix: string | number = '',
) => {
  directory.forEach((i, index) => {
    i.prefix = deep === 1 ? index + 1 : `${parentPrefix}.${index + 1}`;
    if (i.children && i.children.length > 0) {
      addPrefix(i.children, deep + 1, i.prefix);
    }
  });
};
const renderDirectory = (directory: IDirectoryItem[]): React.ReactElement[] => {
  return directory.map((i) => (
    <Fragment key={i.id}>
      <li className="directory_item">
        <a href={'#' + i.id} className="directory_link">
          {i.prefix + '.' + i.content}
        </a>
        {i.children && (
          <ul className="directory_list directory_link_children">
            {renderDirectory(i.children)}
          </ul>
        )}
      </li>
    </Fragment>
  ));
};

type IProps = {
  direction: Direction;
};

const DirectoryCard: React.FC<IProps> = ({ direction }) => {
  const { initialState = { directory: null } } = useModel('@@initialState');
  const { directory = null } = initialState;
  const [realDirectory, setRealDirectory] = useState<IDirectoryItem[]>([]);

  const loading = useMemo(() => {
    return directory === null;
  }, [directory]);

  useEffect(() => {
    const d = (cloneDeep(directory) || []) as IDirectoryItem[];
    directoryTree(d);
    const res: IDirectoryItem[] = [];
    d.forEach((i) => {
      i.children = d.filter((r) => r.parentId === i.id);
      if (!i.parentId) {
        res.push(i);
      }
    });
    addPrefix(res);
    setRealDirectory(res);
    let unbindLinkClick: (() => void) | null = null;
    $(() => {
      unbindLinkClick = linkClickListener();
    });
    return () => {
      unbindLinkClick?.();
    };
  }, [directory]);

  return (
    <CardLoading
      cardProps={{
        label: '目录',
        className: 'mpcard',
        icon: <i className="fa fa-fw fa-align-right font-b" />,
        labelRight: <span id="schedule">0%</span>,
      }}
      controlLoading={loading}
    >
      <ul
        className="directory_list directory_list--root"
        style={{
          maxHeight:
            direction === Direction.UP
              ? 'calc(100vh - 170px)'
              : 'calc(100vh - 120px)',
        }}
      >
        {renderDirectory(realDirectory)}
      </ul>
    </CardLoading>
  );
};

export default memo(DirectoryCard);
