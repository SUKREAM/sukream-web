import styled from '@emotion/styled';

export const NoData = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  font-weight: 500;
  padding: ${({ height }) => height || '180px'};  
  span {
    font-size: 60px;
    color: #f06292;
    margin-bottom: 18px;
  }
`;
