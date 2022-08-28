import { ThemeType } from '@/theme.config';

export enum BlogType {
  //背景模式
  BACKGROUND = 'background',
  //图片模式
  IMAGE = 'image',
}

export enum StorageName {
  BlogTheme = 'blog-theme',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  BlogType = 'blog-type',
}

//获取当前主题名称
export const getThemeName = (): ThemeType => {
  return (localStorage[StorageName.BlogTheme] || ThemeType.LIGHT) as ThemeType;
};

//存储当前主题名称
export const setThemeName = (type: ThemeType) => {
  return localStorage.setItem(StorageName.BlogTheme, type);
};

//获取当前模式
export const getBlogType = (): BlogType => {
  return (localStorage[StorageName.BlogType] || BlogType.IMAGE) as BlogType;
};

//存储当前模式
export const setBlogType = (type: BlogType) => {
  return localStorage.setItem(StorageName.BlogType, type);
};
