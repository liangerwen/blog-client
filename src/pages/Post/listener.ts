/* eslint-disable @typescript-eslint/no-invalid-this */
import throttle from 'lodash.throttle';

import { $message } from '@/components/Message';

export const expandListener = () => {
  $('.expand_btn').on('click', function () {
    let target = null;
    const hidden = $(this).hasClass('expand_tools');
    if ($(this).hasClass('closed')) {
      $(this).removeClass('closed');
      if (hidden) {
        target = $(this).parent().next();
        target.css('display', 'flex');
      } else {
        target = $(this).parent();
        target.css('max-height', '300px');
      }
      return;
    }
    $(this).addClass('closed');
    if (hidden) {
      target = $(this).parent().next();
      target.css('display', 'none');
    } else {
      target = $(this).parent();
      target.css('max-height', '100%');
    }
  });
  return () => {
    $('.expand_btn').off('click');
  };
};

export const copyListener = () => {
  $('.copy-button').on('click', function () {
    const selection = window.getSelection();
    const range = document.createRange();
    const target = $(this).parent().next();
    range.selectNodeContents(target[0]);
    //@ts-ignore
    selection.removeAllRanges();
    //@ts-ignore
    selection.addRange(range);
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      try {
        document.execCommand('copy');
        $message('复制成功');
      } catch {
        $message('复制失败');
      }
    }
    //@ts-ignore
    selection.removeAllRanges();
  });
  return () => {
    $('.copy-button').off('click');
  };
};

const selector$Id = (str: string) => {
  return str.toString().replace(/\W/g, '\\$&') || '';
};

export const scrollListener = () => {
  const titles = $('#article-container .directory_title').map(function () {
    const offsetTop = $(this).offset()?.top || 0;
    return {
      id: $(this).attr('id') || '',
      begin: Math.floor(offsetTop),
    };
  });
  function listenr() {
    const postTop = $('#article-container')?.offset()?.top || 0;
    const postHeight = $('#article-container')?.height() || 0;
    //@ts-ignore
    if (this.scrollY >= postTop + postHeight) {
      $('.directory_link').removeClass('active');
      $('.directory_item').removeClass('active');
      $('#schedule').text('100%');
      return;
    }
    const cur = Array.from(titles)
      .reverse()
      //@ts-ignore
      .find((i) => this.scrollY >= i.begin);
    if (cur) {
      const curLink = $(`.directory_link[href=\\#${selector$Id(cur.id)}]`);
      if (!curLink.hasClass('active')) {
        $('.directory_link').removeClass('active');
        $('.directory_item').removeClass('active');
        curLink.parents('.directory_item').addClass('active');
        curLink.addClass('active');
      }
      $('#schedule').text(
        //@ts-ignore
        Math.floor(((this.scrollY - titles[0].begin) / postHeight) * 100) + '%',
      );
    } else {
      $('#schedule').text('0%');
      $('.directory_link').removeClass('active');
      $('.directory_item').removeClass('active');
    }
  }
  $(window).on('scroll', throttle(listenr, 100));
  return () => {
    $(window).off('scroll');
  };
};

export const linkClickListener = () => {
  $('.directory_link').on('click', function (e: Event) {
    e.preventDefault();
    $('.directory_link').removeClass('active');
    $('.directory_item').removeClass('active');
    $(this).parents('.directory_item').addClass('active');
    $(this).addClass('active');
    const targetId = $(this).attr('href')?.slice(1) || '';
    const targetTop = $('#' + selector$Id(targetId)).offset()?.top || 0;
    $('html').animate(
      {
        scrollTop: targetTop,
      },
      300,
    );
  });
  return () => {
    $('.directory_link').off('click');
  };
};
