import { css } from '@emotion/react';
import styled from '@emotion/styled';

// 사이즈
const sizeStyles = {
    small: css`
		padding: 4px 10px;
		font-size: 12px;
		height: 30px;
	`,

	medium: css`
		padding: 8px 16px;
		font-size: 14px;
		height: 36px;
    `,

    large: css`
		padding: 10px 20px;
		font-size: 16px;
		height: 44px;
    `,
	
	half: css`
		width: 50%;
		height: 36px;
    `,

	full: css`
		height: 48px;
		font-size: 16px;
		font-weight: 500;
    `,
};

// 모양
const shapeStyles = {
	square: css`
		border-radius: 5px;
    `,
    round: css`
		border-radius: 30px;
    `,
};

// 타입
const typeStyles = {
	primary: css`
		color: #fff;
		background: #f06292;
		border: 1.5px solid #f06292;
    `,

	edit: css`
		color: #fff;
		background: #4caf50;
		border: 1.5px solid #4caf50;
	`,

	delete: css`
    color: #f06292;
    border: 1.5px solid #f06292;
    background: none;
`,
    report: css`
    color: #fff;
    background: #ff4d4d;
    border: 1.5px solid #ff4d4d;
    `,
};

// 소셜 스타일 
const socialStyles = {
    kakao: css`
    background: #fee500;
    color: #191600;
    border: none;
    `,
    naver: css`
    background: #03c75a;
    color: #fff;
    border: none;
    `,
    google: css`
    background: #fff;
    color: #000;
    border: 1px solid #ddd;
    `,
    email: css`
    background: #333;
    color: #fff;
    border: none;
    `,
};



export const BasicButton = styled.button<{
    size?: keyof typeof sizeStyles;
    shape?: keyof typeof shapeStyles;
    btnType?: keyof typeof typeStyles;
    social?: keyof typeof socialStyles;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
	margin-bottom: 8px;
    font-weight: 500;
    box-sizing: border-box;
	transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;

    &:hover {
    opacity: 0.9;
    }

    &:disabled {
    color: #fff;
    background: #ccc;
    border: 1.5px solid #ccc;
    cursor: not-allowed;
		&:hover {
			opacity: 1;
        }
    }

	${({ size }) => size && sizeStyles[size]};
	${({ shape }) => shape && shapeStyles[shape]};
	${({ btnType }) => btnType && typeStyles[btnType]};
	${({ social }) => social && socialStyles[social]};
`;
