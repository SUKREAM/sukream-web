import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../../components/Button';
import Container from '../../components/Container/Container';
import { useLogin } from './hooks/useLogin';
import { setStoredUser, getStoredUser } from "../../utils/userStorage";

import * as S from './SelfLoginPage.styles';
import { FindEmailModal } from './component/FindEmailModal';
import { useModal } from '../../hooks/useModal';
import { FindPasswordModal } from './component/FindPasswordModal';

export const SelfLoginPage = () => {
const navigate = useNavigate();

const [email, setEmail] = useState('');
const [pw, setPw] = useState('');
const [touched, setTouched] = useState({ email: false, pw: false });
const { secondModalOpen, modalOpen } = useModal();


const { mutate: login } = useLogin();

const handleLogin = () => {
    if (!email || !pw) return;

    login(
        { email, pw },
        {
            onSuccess: (data) => {
                console.log('로그인 성공, 토큰:', data.accessToken);
                setStoredUser(data.userInfo, data.accessToken);
                navigate('/main');
            },
            onError: (error) => {
                console.error('Login failed:', error);
            },
        }
    );
};



return (
    <>
    <Container showBackButton={true} title="로그인">
    <S.Title>자체 로그인</S.Title>

    <S.InputWrapper>
        <S.Label>이메일 *</S.Label>
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

    <S.InputWrapper>
        <S.Label>비밀번호 *</S.Label>
        <S.StyledInput
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, pw: true }))}
        placeholder="비밀번호를 입력해주세요."
        isError={touched.pw && !pw}
        />
        {touched.pw && !pw && (
        <S.ErrorMessage>비밀번호를 입력해주세요.</S.ErrorMessage>
        )}
    </S.InputWrapper>

    <S.OptionsRow>
        <label>
        <input type="checkbox" />
        아이디 저장
        </label>
        <S.LinkGroup>
        <S.LinkText onClick={secondModalOpen}>아이디 찾기</S.LinkText>
        <S.Divider>|</S.Divider>
        <S.LinkText onClick={modalOpen}>비밀번호 찾기</S.LinkText>
        </S.LinkGroup>
    </S.OptionsRow>

    <S.BottomText>
        계정이 없으신가요?{' '}
        <S.JoinText onClick={() => navigate('/signup')}>회원가입</S.JoinText>
    </S.BottomText>

    <BasicButton
        size="full"
        shape="square"
        social="email"
        onClick={handleLogin}
    >
        로그인
    </BasicButton>
    </Container>
    <FindEmailModal/>
    <FindPasswordModal/>
    </>
);
};

