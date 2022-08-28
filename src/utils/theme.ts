import type { ThemeType } from '@/theme.config';
import { ThemeFontSizeConfig } from '@/theme.config';
import { gradientColorImg } from './random';
import { getThemeName, setThemeName } from './storage';
import { BlogType, getBlogType, setBlogType } from '.';
// import { getImgUrl } from '@/http/api';

export enum FontSizeType {
  PLUS = 'plus',
  MINUS = 'minus',
  INIT = 'init',
}

//设置主题颜色
export const setThemeColor = (type: ThemeType) => {
  document.documentElement.setAttribute('data-theme', type);
  setThemeName(type);
};

export const changeFontSize = (type: FontSizeType) => {
  const fontSizeList = Object.entries(ThemeFontSizeConfig);
  fontSizeList.forEach((i) => {
    const [key, value] = i;
    const curItemFontSize = parseInt(
      document.documentElement.style.getPropertyValue(key).split('px')[0],
    );
    let itemFontSize = curItemFontSize;
    switch (type) {
      case FontSizeType.PLUS: {
        itemFontSize =
          curItemFontSize + 2 > value.max ? value.max : curItemFontSize + 2;
        break;
      }
      case FontSizeType.MINUS: {
        itemFontSize =
          curItemFontSize - 2 < value.min ? value.min : curItemFontSize - 2;
        break;
      }
      case FontSizeType.INIT: {
        itemFontSize = value.default;
        break;
      }
      default: {
        break;
      }
    }
    document.documentElement.style.setProperty(key, itemFontSize + 'px');
  });
};

export const init = () => {
  setThemeColor(getThemeName());
  changeFontSize(FontSizeType.INIT);
  getBlogType() === BlogType.BACKGROUND
    ? setBlogType(BlogType.BACKGROUND)
    : setBlogType(BlogType.IMAGE);
};

export const changeBgTheme = async () => {
  // getImgUrl().then((res) => {
  // const bg = gradientColorImg(res.link);
  const bg = gradientColorImg();
  const curBg =
    document.documentElement.style.getPropertyValue('--blog-bg-color');
  //颜色没变时再次执行
  if (bg === curBg) {
    changeBgTheme();
    return;
  }
  document.documentElement.style.setProperty('--blog-bg-color', bg);
  // });
};
