import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import Modal from '../Modal';

type IProps = {
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  visible?: boolean;
  content?: string;
};

export const Confirm: React.FC<IProps> = ({
  title = '标题',
  onConfirm,
  onCancel,
  confirmText = '确认',
  cancelText = '取消',
  content = '',
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onCancel?.();
        setVisible(false);
      }}
      onConfirm={() => {
        onConfirm?.();
        setVisible(false);
      }}
      confirmText={confirmText}
      cancelText={cancelText}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={true}
    >
      {content}
    </Modal>
  );
};

export default Confirm;

export const $confirm = ({
  title = '标题',
  onConfirm,
  onCancel,
  confirmText = '确认',
  cancelText = '取消',
  content,
}: IProps) => {
  const modal = $('<div></div>')[0];
  ReactDOM.render(
    React.createElement(Confirm, {
      title,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      content,
    }),
    modal,
  );
};
