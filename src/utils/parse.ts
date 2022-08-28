export const html2str = (str: string) => {
  const isString = Object.prototype.toString.call(str) === '[object String]';
  return isString
    ? str.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, ' ')
    : '';
};
