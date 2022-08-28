import { $confirm } from '@/components/Confirm';

export const addToBookmark = () => {
  // @ts-ignore
  if (window.sidebar && window.sidebar.addPanel) {
    // Mozilla Firefox Bookmark
    // @ts-ignore
    window.sidebar.addPanel(document.title, window.location.href, '');
    // @ts-ignore
  } else if (window.external && 'AddFavorite' in window.external) {
    // IE Favorite
    // @ts-ignore
    window.external.AddFavorite(location.href, document.title);
  } else {
    $confirm({
      title: '添加书签？',
      content: '按CTRL+ D 键将本页加入书签！',
    });
  }
};
