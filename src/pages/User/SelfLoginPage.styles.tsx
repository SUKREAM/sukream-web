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
export const SuccessMessage = styled.p`
    color: #52c41a;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
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


export const ErrorMessage = styled.div<{ isError?: boolean }>`
    font-size: 12px;
    color: ${({ isError }) => (isError ? '#ccc': '#ff6b6b')};
    margin-top: 0px;
    margin-bottom: 12px;
`;

export const GenderWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const GenderButton = styled.button<{ selected: boolean }>`
    flex: 1;
    padding: 10px;
    background-color: ${({ selected }) => (selected ? '#f66' : '#f0f0f0')};
    color: ${({ selected }) => (selected ? '#fff' : '#000')};
    border-radius: 6px;
    border: none;
`;

export const BirthRow = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`;

export const BirthInput = styled.input`
    width: 60px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    text-align: center;
`;
