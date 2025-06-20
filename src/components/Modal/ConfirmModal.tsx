import React from 'react';

import Button from '../../components/Button';

import * as S from './Modal.styles';
import ModalLayout from './ModalLayout';

interface IProps {
	title?: string;
	open?: boolean;
	onClose?: () => void;
	onOk?: () => void;
	okText?: string;
}

export default function ConfirmModal({
	open,
	title,
	onClose,
	onOk,
	okText,
}: IProps) {
	return (
		<ModalLayout onClose={onClose} open={open} width="398px">
			<p className="modal-confirm-title">{title}</p>
			<S.ModalButtons>
				<Button btnType="primary" onClick={onOk}>
					{okText ? okText : '확인'}
				</Button>
				<Button onClick={onClose}>취소</Button>
			</S.ModalButtons>
		</ModalLayout>
	);
}
