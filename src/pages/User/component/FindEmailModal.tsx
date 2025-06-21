import { Form } from 'antd';
import Modal from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { useEffect, useState } from 'react';
import * as S from '../SelfLoginPage.styles';
import { useFindEmail } from '../hooks/useFindEmail';

export const FindEmailModal = () => {
    const { isSecondOpen, onSecondClose } = useModal();
    const [phone, setPhone] = useState('');
    const [touched, setTouched] = useState({ phone: false });


    const { mutate: findEmail, isError, isSuccess } = useFindEmail();

    const handleFindEmail = async () => {
        findEmail(phone)
        console.log(isError)
    }

    return (
    <>
    <Modal 
        onClose={onSecondClose}
        open={isSecondOpen} 
        title='아이디 찾기'
        subtitle='가입하신 전화번호로 아이디가 전송됩니다'
        okText='전송'
        onOk={handleFindEmail}
    >
    <S.InputWrapper>
        <S.Label>사용자 전화번호 입력 *</S.Label>
        <S.StyledInput
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
        placeholder="예) 010-0000-0000"
        isError={touched.phone && !phone}
        />
        {touched.phone && !phone && (
        <S.ErrorMessage>전화번호을 입력해주세요.</S.ErrorMessage>
        )}
        {isSuccess && (
                    <S.SuccessMessage>전송되었습니다.</S.SuccessMessage>
                )}
    </S.InputWrapper>
    </Modal>
    </>
    )
}
