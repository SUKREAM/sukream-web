import React, { ReactNode, CSSProperties } from 'react';

import * as S from './Button.styles';

interface IProps {
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	btnType?: 'primary' | 'edit' | 'delete' | 'report';
	disabled?: boolean;
	style?: CSSProperties;
	children?: ReactNode;
	size?: 'small' | 'medium' | 'large' | 'half' | 'full';
	social?: 'kakao' | 'naver' | 'google' | 'email';
	shape?: 'round' | 'square';
}

export default function Button({
	onClick,
	type = 'button',
	btnType = 'primary',
	disabled = false,
	style,
	children,
	className = '',
	size = 'medium',
	social,
	shape = 'square',
}: IProps) {
	return (
		<S.BasicButton
			onClick={onClick}
			type={type}
			disabled={disabled}
			size = {size}
			btnType={btnType}
			style={style}
			shape={shape}
			className={className}
			social={social}
		>
			{children}
		</S.BasicButton>
	);
}
