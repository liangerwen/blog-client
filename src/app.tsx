import { BlogType, createMusic, getBlogType, init } from '@/utils';
import type { IDirectoryItem } from './layout/components/DirectoryCard';
import type { IPostItem } from './http/api';
import {
  getArchivesByMonth,
  getBlogConfig,
  getCategories,
  getNewPosts,
  getTags,
  getUserInfo,
  getWebsiteInfo,
} from './http/api';

import './index.less';
import './modal.less';
import type { HttpResponse } from './http';

init();

export async function getInitialState() {
  const fetchData = async (
    fetchFn: () => Promise<HttpResponse<any>>,
    defaultValue: any,
  ) => {
    try {
      const data = (await fetchFn()).data;
      return data;
    } catch {
      return defaultValue;
    }
  };

  const tags = await fetchData(getTags, []);
  const categories = await fetchData(getCategories, []);
  const archives = await fetchData(getArchivesByMonth, []);
  const { total, list } = await fetchData(getNewPosts, { total: 0, list: [] });
  const userInfo = await fetchData(getUserInfo, {
    avatar: '',
    description: '',
    github: '',
    gitee: '',
    name: '',
  });
  const webInfo = await fetchData(getWebsiteInfo, {
    views: 0,
    visitors: 0,
    create_time: Date.now(),
    announcement: '',
  });
  const config = await fetchData(getBlogConfig, {
    music_id: '',
    music_server: '',
    quotes: [],
    wx_exceptional: '',
    alipay_exceptional: '',
  });

  createMusic(config.music_server, config.music_id);

  return {
    announcement: webInfo.announcement,
    newPosts: list,
    categories,
    tags,
    archives,
    userInfo,
    webInfo: {
      postCount: total,
      runtime: Math.floor(
        (Date.now() - new Date(webInfo.create_time).getTime()) /
          (1000 * 3600 * 24),
      ),
      visitors: webInfo.visitors,
      views: webInfo.views,
    },
    postCount: total,
    directory: null as null | IDirectoryItem[],
    post: {} as IPostItem,
    type: getBlogType(),
    title: "liangerwen's☻Blog",
    config,
  };
}

// @ts-ignore
export function onRouteChange({ matchedRoutes }) {
  if (
    matchedRoutes.lastItem.match.path === '/pages/:page' &&
    getBlogType() === BlogType.IMAGE
  ) {
    document.documentElement.scrollTop = window.innerHeight;
  } else {
    document.documentElement.scrollTop = 0;
  }
}
