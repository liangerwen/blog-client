import type { IPostItem } from '.';
import request from '../index';
import type { HttpResponse } from '../index';

export const getPostDetail = async (id: string) => {
  return request<HttpResponse<IPostItem>>(`/post/detail?id=${id}`, {
    method: 'GET',
  });
};
