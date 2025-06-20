import styled from 'styled-components';

export const Title = styled.h2`
    text-align: center;
    margin: 0 0 80px 0;
    font-size: 18px;
`;

export const StyledInput = styled.input<{ isError?: boolean }>`
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 12px 0;
    font-size: 14px;
    outline: none;
    border-bottom: 1px solid ${({ isError }) => (isError ? '#ff6b6b' : '#ccc')};

    &::placeholder {
        color: #aaa;
    }
`;

export const OptionsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #555;
    margin-bottom: 80px;

    input {
        margin-right: 4px;
    }
`;

export const LinkGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const LinkText = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;

export const Divider = styled.span`
    color: #ccc;
`;

export const BottomText = styled.div`
    text-align: center;
    font-size: 14px;
    margin-bottom: 16px;
`;

export const JoinText = styled.span`
    font-weight: bold;
    cursor: pointer;
    color: #333;
    text-decoration: underline;
`;

export const InputWrapper = styled.div`
    margin-bottom: 48px;
`;

export const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
    display: block;
`;


export const ErrorMessage = styled.div`
    font-size: 12px;
    color: #ff6b6b;
    margin-top: 0px;
    margin-bottom: 12px;
`;
