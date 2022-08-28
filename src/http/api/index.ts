import request, { HttpResponse } from '../index';
import { IPostItem, IPostList } from './home';

export type CategoryOrTag = {
  id: number;
  name: string;
  count?: number;
};

export const getCategories = async (postId?: number) => {
  return request<HttpResponse<CategoryOrTag[]>>('/post/categories', {
    method: 'GET',
    params: postId ? { postId } : {},
  });
};

export const getTags = async (postId?: number) => {
  return request<HttpResponse<CategoryOrTag[]>>('/post/tags', {
    method: 'GET',
    params: postId ? { postId } : {},
  });
};

export enum ArchivesParamsType {
  MONTH = 'month',
  YEAR = 'year',
}

export type ArchivesType = {
  date: number;
  posts: IPostItem[];
};

export const getArchivesByMonth = async () => {
  return request<HttpResponse<ArchivesType[]>>('/post/archives', {
    method: 'GET',
    params: { type: ArchivesParamsType.MONTH },
  });
};

export type YearArchivesType = { total: number; list: ArchivesType[] };

export const getArchivesByYear = async (page: number = 1) => {
  return request<HttpResponse<YearArchivesType>>('/post/archives', {
    method: 'GET',
    params: { type: ArchivesParamsType.YEAR, page },
  });
};

export type UserInfoData = {
  name: string;
  avatar: string;
  description: string;
  github: string;
  gitee: string;
};

export const getUserInfo = async () => {
  return request<HttpResponse<UserInfoData>>('/user', {
    method: 'GET',
  });
};

export const getNewPosts = async () => {
  return request<HttpResponse<IPostList>>(`/post/newPosts`, {
    method: 'GET',
  });
};

export const getAllPosts = async () => {
  return request<HttpResponse<IPostItem[]>>(`/post/allPosts`, {
    method: 'GET',
  });
};

export type WebsiteInfo = {
  views: number;
  visitors: number;
  create_time: Date;
  announcement: string;
};

export const getWebsiteInfo = async () => {
  return request<HttpResponse<WebsiteInfo>>(`/websiteInfo`, {
    method: 'GET',
  });
};

export type BlogConfigType = {
  music_server: string;
  music_id: string;
  quotes: string[];
  wx_exceptional: string;
  alipay_exceptional: string;
};

export async function getBlogConfig() {
  return request<HttpResponse<BlogConfigType>>('/blog/config', {
    method: 'GET',
  });
}

export * from './home';
export * from './post';
