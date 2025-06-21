import React, { ReactNode } from 'react';
import Button from '../../components/Button';
import * as S from './Modal.styles';
import ModalLayout from './ModalLayout';

interface IProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  open?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  width?: string;
  okText?: string;
  cancleText?: string;
  disabled?: boolean;
  button?: boolean;
  show?: boolean;
}

export default function Modal({
  children,
  title,
  subtitle,
  open,
  onClose,
  onOk,
  width,
  okText,
  cancleText,
  disabled = false,
  button = true,
  show,
}: IProps) {
  
  return (
    <ModalLayout onClose={onClose} open={open} width={width} show={show}>
      <div style={{ paddingBottom: '10px' }}>
        {title && <p className="modal-title">{title}</p>}
        {subtitle && <p className="modal-sub-title">{subtitle}</p>}
      </div>
      <S.ChildrenContainer width={width}>
        {children}
      </S.ChildrenContainer>
      { button && <S.ModalButtons>
        <Button btnType="primary" onClick={onOk} disabled={disabled}>
          {okText ? okText : '등록'}
        </Button>
        <Button onClick={onClose}>{cancleText ? cancleText : '취소'}</Button>
      </S.ModalButtons> }
    </ModalLayout>
  );
}
