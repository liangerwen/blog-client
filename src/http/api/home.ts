import request from '../index';
import http from 'umi-request';
import { HttpResponse } from '../index';
import { ThemeType } from '@/theme.config';
import { getThemeName, isMobile } from '@/utils';

export type IPostItem = {
  id: number | string;
  cover_img: string;
  title: string;
  content: string;
  create_time: Date | string;
  tags?: number[];
  categories?: number[];
  sticky?: boolean;
};

export type IPostList = {
  total: number;
  list: IPostItem[];
};

export const getPosts = async (
  page: number,
  mark: string = '',
  id: string | number,
) => {
  return request<HttpResponse<IPostList>>(
    `/post/list?page=${page}&mark=${mark}&id=${id}`,
    {
      method: 'GET',
    },
  );
};

export type ImageType = {
  link: string;
};
export const getImgUrl = async () => {
  const type = getThemeName() === ThemeType.DARK ? 'night' : 'day';
  const direction = isMobile() ? 'vertical' : '';
  return http<ImageType>(
    `https://v1.yurikoto.com/wallpaper?encode=json&type=${type}&orientation=${direction}`,
    {
      method: 'GET',
    },
  );
};
