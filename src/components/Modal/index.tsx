import React, { memo } from 'react';
import Dialog from 'rc-dialog';

import styles from './index.less';

type IProps = {
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  visible?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  closable?: boolean;
  destroyOnClose?: boolean;
  children: React.ReactElement | string;
};

const Modal: React.FC<IProps> = ({
  title = '标题',
  onConfirm,
  onCancel,
  children,
  confirmText = '确认',
  cancelText = '取消',
  visible = false,
  maskClosable = true,
  keyboard = true,
  closable = true,
  destroyOnClose = false,
}) => {
  const renderFooter = () => (
    <div className={styles.modalFooter}>
      {closable && (
        <button
          className={styles.modalBtn}
          onClick={(e) => {
            onCancel?.(e);
          }}
        >
          {cancelText}
        </button>
      )}
      <button
        className={styles.modalBtn}
        onClick={(e) => {
          onConfirm?.(e);
        }}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Dialog
      title={<h3 className={styles.modalTitle}>{title}</h3>}
      zIndex={888}
      visible={visible}
      onClose={() => {
        onCancel?.();
      }}
      closable={false}
      footer={renderFooter()}
      maskClosable={maskClosable}
      keyboard={keyboard}
      className={styles.modal}
      wrapClassName={styles.warp}
      maskAnimation="fade"
      animation="zoom"
      destroyOnClose={destroyOnClose}
    >
      <div className={styles.modalContent}>{children}</div>
    </Dialog>
  );
};

export default memo(Modal);
