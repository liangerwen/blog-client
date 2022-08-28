import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.less';

type IProps = {
  message: string;
};

const Message: React.FC<IProps> = ({ message }) => {
  return <>{message}</>;
};

export default Message;

export const $message = (msg: string, time = 2000) => {
  const message = $('<div></div>')[0];
  $(message).addClass(styles.message);
  $('body').append($(message));
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(message);
    $(message).remove();
  }, time);
  ReactDOM.render(React.createElement(Message, { message: msg }), message);
};
