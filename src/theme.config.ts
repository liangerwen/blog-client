type FontSizeConfig = Record<
  string,
  {
    default: number;
    min: number;
    max: number;
  }
>;

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

//字体大小配置
export const ThemeFontSizeConfig: FontSizeConfig = {
  '--blog-text-size': {
    default: 14,
    min: 12,
    max: 20,
  },
};
