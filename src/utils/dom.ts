export const getScrollTop = () => {
  return document.scrollingElement ? document.scrollingElement.scrollTop : 0;
};

export const createMusic = (server: string, id: string) => {
  const oldMusics = $('meting-js');
  if (oldMusics) {
    $('meting-js').remove();
  }
  const music = $('<meting-js></meting-js>');
  music.attr('type', 'playlist');
  music.attr('server', server && id ? server : 'tencent');
  music.attr('id', server && id ? id : '8052692129');
  music.attr('fixed', 'true');
  music.attr('mini', 'true');
  $('body').append(music);
};
