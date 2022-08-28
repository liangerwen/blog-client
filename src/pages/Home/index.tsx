import type { IRouteComponentProps } from 'umi';
import { history } from 'umi';
import { useState, useEffect } from 'react';

import Pagination from '@/components/Pagination';
import PostList from '@/components/PostList';
import { LoadingContainer } from '@/components/Loading';
import { HttpCode } from '@/http';
import type { IPostList } from '@/http/api';
import { getPosts } from '@/http/api';

enum Mark {
  PAGE = 'page',
  TAG = 'tag',
  CATEGORY = 'category',
  ARCHIVE = 'archive',
}

const Home: React.FC<IRouteComponentProps<{ page: string; id?: string }>> = (
  props,
) => {
  const [page, setPage] = useState(Number(props.match.params.page || 1));
  const [data, setData] = useState<IPostList>({ total: 0, list: [] });
  const [loading, setLoading] = useState(true);
  const mark = props.route.mark || '';
  const id = props.match.params.id || -1;

  const fetchPosts = () => {
    setLoading(true);
    getPosts(page, mark, id)
      .then((res) => {
        if (res.code === HttpCode.SUCCESS) {
          if (res.data.list.length > 0) {
            setData(res.data);
          } else {
            history.push('/404');
          }
        } else {
          history.push('/404');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [page, id]);

  return (
    <LoadingContainer loading={loading}>
      <PostList data={data.list} />
      <Pagination
        currentPage={page}
        total={data.total}
        limit={8}
        onPageChange={(val) => {
          setPage(val);
          switch (mark) {
            case Mark.PAGE:
              history.push(`/pages/${val}`);
              break;
            case Mark.CATEGORY:
              history.push(`/categories/${id}/${val}` + props.location.search);
              break;
            case Mark.TAG:
              history.push(`/tags/${id}/${val}` + props.location.search);
              break;
            default:
              history.push(`/pages/${val}`);
              break;
          }
        }}
      />
    </LoadingContainer>
  );
};

export default Home;
