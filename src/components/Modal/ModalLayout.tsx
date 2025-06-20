import React, { ReactNode } from 'react';

import * as S from './Modal.styles';
import ModalPortal from './ModalPortal';


interface IProps {
	children: ReactNode;
	open?: boolean;
	show?: boolean;
	onClose?: () => void;
	width?: string;
}

export default function ModalLayout({
	children,
	open,
	show, 
	onClose,
	width = '720px',
}: IProps) {

	return open ? (
		<ModalPortal>
			<S.ModalWrap show={show} onClick={onClose}>
				<S.ModalContainer>
					<S.ModalInner width={width}>
						<S.ModalContent onClick={(e) => e.stopPropagation()}>
							<button onClick={onClose} className="close-button">
							</button>
							{children}
						</S.ModalContent>
					</S.ModalInner>
				</S.ModalContainer>
			</S.ModalWrap>
		</ModalPortal>
	) : null;
}
