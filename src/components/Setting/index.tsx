import { useState, memo } from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';

import {
  setThemeColor,
  changeFontSize,
  FontSizeType,
  getThemeName,
  changeBgTheme,
  BlogType,
  getBlogType,
  setBlogType,
} from '@/utils';
import { ThemeType } from '@/theme.config';
import { $message } from '../Message';
import styles from './index.less';

type IProps = {
  post?: boolean;
  visble?: boolean;
};

const Setting: React.FC<IProps> = ({ post = false, visble = false }) => {
  const { initialState = { type: getBlogType() }, setInitialState } =
    useModel('@@initialState');
  const [theme, setTheme] = useState<ThemeType>(getThemeName());
  const [showSetting, setShowSetting] = useState<boolean>(false);

  const renderSettingMenu = () => {
    return (
      <div
        className={classNames(
          styles.moreSetting,
          showSetting ? styles.moveIn : styles.moveOut,
        )}
      >
        {/* {post && (
          <li
            className={classNames(styles.settingMenuItem, 'link')}
            title="阅读模式"
          >
            <i className="fa fa-fw fa-book"></i>
          </li>
        )} */}
        <li
          className={classNames(styles.settingMenuItem, 'link')}
          onClick={() => {
            changeFontSize(FontSizeType.PLUS);
          }}
          title="放大字体"
        >
          <i className="fa fa-fw fa-plus" />
        </li>
        <li
          className={classNames(styles.settingMenuItem, 'link')}
          onClick={() => {
            changeFontSize(FontSizeType.MINUS);
          }}
          title="缩小字体"
        >
          <i className="fa fa-fw fa-minus" />
        </li>
        {(!post || initialState?.type === BlogType.BACKGROUND) && (
          <li
            className={classNames(styles.settingMenuItem, 'link')}
            onClick={() => {
              changeBgTheme();
              $message('切换成功');
            }}
            title="随机图片"
          >
            <i className="fa fa-fw fa-random" />
          </li>
        )}
        <li
          className={classNames(styles.settingMenuItem, 'link')}
          onClick={() => {
            const targetType =
              initialState?.type === BlogType.BACKGROUND
                ? BlogType.IMAGE
                : BlogType.BACKGROUND;
            setBlogType(targetType);
            // @ts-ignore
            setInitialState({ ...initialState, type: targetType });
            $message('切换成功');
          }}
          title={
            initialState?.type === BlogType.BACKGROUND ? '图片模式' : '背景模式'
          }
        >
          <i
            className={classNames(
              'fa fa-fw',
              initialState?.type === BlogType.BACKGROUND
                ? 'fa-photo'
                : 'fa-adjust',
            )}
          />
        </li>
        <li
          className={classNames(styles.settingMenuItem, 'link')}
          onClick={() => {
            const curTheme =
              theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
            setTheme(curTheme);
            setThemeColor(curTheme);
            $message(
              `您已切换为${curTheme === ThemeType.LIGHT ? '明亮' : '暗黑'}模式`,
            );
          }}
          title={`切换为${theme === ThemeType.LIGHT ? '暗黑' : '明亮'}模式`}
        >
          <i
            className={classNames(
              'fa fa-fw',
              theme === ThemeType.LIGHT ? 'fa-moon-o' : 'fa-sun-o',
            )}
          />
        </li>
      </div>
    );
  };

  return (
    <ul
      className={classNames(
        styles.menu,
        visble ? styles.moveIn : styles.moveOut,
      )}
    >
      {renderSettingMenu()}
      <li
        className={classNames(styles.settingMenuItem, 'link')}
        onClick={() => {
          setShowSetting(!showSetting);
        }}
        title="设置"
      >
        <i className="fa fa-fw fa-cog roate" />
      </li>
      {/* {post && (
        <li
          className={classNames(styles.settingMenuItem, 'link')}
          title="直达评论"
        >
          <i className="fa fa-fw fa-comments"></i>
        </li>
      )} */}
      <li
        className={classNames(styles.settingMenuItem, 'link')}
        onClick={() => {
          $('html').animate({ scrollTop: 0 }, 300);
        }}
        title="回到顶部"
      >
        <i className="fa fa-fw fa-arrow-up" />
      </li>
    </ul>
  );
};

export default memo(Setting);
