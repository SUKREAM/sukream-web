import { ReactNode, useEffect } from 'react';

import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: { children: ReactNode }) {
	useEffect(() => {
		document.body.style.overflowY = 'hidden';
		return () => {
			document.body.style.overflowY = 'scroll';
		};
	}, []);
	return createPortal(
		children,
		document.getElementById('modal-root') as HTMLElement,
	);
}
