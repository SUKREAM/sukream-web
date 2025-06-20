import styled from '@emotion/styled';
import { ArrowLeft } from 'lucide-react';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    padding: 40px 24px;
    background-color: #fff;
`;

export const Header = styled.div<{ center?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;

    ${({ center }) =>
        center &&
    `
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;

export const BackIcon = styled(ArrowLeft)`
    cursor: pointer;
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
`;


export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;