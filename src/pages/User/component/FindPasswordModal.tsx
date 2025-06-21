import { Form } from 'antd';
import Modal from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { useEffect, useState } from 'react';
import * as S from '../SelfLoginPage.styles';
import { useFindPassword } from '../hooks/useFindPassword';

export const FindPasswordModal  = () => {
    const { isOpen, onClose } = useModal();
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState({ email: false });

    const { mutate: findPassword, isError, isSuccess } = useFindPassword();

    const handleFindPassword = async () => {
        findPassword(email)
        console.log(isError)
    }

    return (
    <>
    <Modal 
        onClose={onClose}
        open={isOpen} 
        title='비밀번호 찾기'
        subtitle='가입하신 이메일로 비밀번호가 전송됩니다'
        okText='전송'
        onOk={handleFindPassword}
    >
    <S.InputWrapper>
        <S.Label>사용자 이메일 입력 *</S.Label>
        <S.StyledInput
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        placeholder="예) creampuff123@gmail.com"
        isError={touched.email && !email}
        />
        {touched.email && !email && (
        <S.ErrorMessage>이메일을 입력해주세요.</S.ErrorMessage>
        )}
    </S.InputWrapper>
    {isSuccess && (
                    <S.SuccessMessage>전송되었습니다.</S.SuccessMessage>
                )}
    </Modal>
    </>
    )
}