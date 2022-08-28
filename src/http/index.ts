import { extend } from 'umi-request';
import type { ResponseError } from 'umi-request';

export enum HttpCode {
  SUCCESS = 1,
  ERROR = 10000,
}

export type HttpResponse<T = any> = {
  code: HttpCode;
  data: T;
  msg: string;
};

export type TableData<T = any> = {
  total: number;
  list: T[];
};

const request = extend({
  prefix: process.env.BASE_URL,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
  },
  errorHandler: (error: ResponseError) => {
    /* eslint-disable-next-line */
    console.error(JSON.stringify(error));
    return {
      code: 500,
      msg: '系统错误',
      data: null,
    };
  },
});

request.interceptors.response.use(async (res) => {
  return await res.json();
});

export default request;
