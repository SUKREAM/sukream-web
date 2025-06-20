import { PropsWithChildren } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './Container.styled';

interface ContainerProps {
    showBackButton?: boolean;
    title?: string;
    center?: boolean;
}

export default function Container({
    children,
    showBackButton = false,
    title = '',
    center = false,
}: PropsWithChildren<ContainerProps>) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        if (location.pathname === '/') return;
        navigate(-1);
    };

    return (
        <S.Wrapper>
            {(showBackButton || title) && (
            <S.Header center={center}>
                {showBackButton && <S.BackIcon onClick={handleBack} />}
                {title && <S.Title>{title}</S.Title>}
            </S.Header>
        )}
        <S.Content>{children}</S.Content>
    </S.Wrapper>
    );
}