import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthVerification } from './hooks/useOAuthVerification';
import BasicButton from '../../components/Button'
import Container from '../../components/Container/Container';

export const LoginPage = () => {
  const navigate = useNavigate();

  const kakaoLogin = useOAuthVerification();
  const naverLogin = useOAuthVerification();

  const handleOAuth = useCallback(
    (provider: 'kakao' | 'naver') => {
      const CLIENT_ID = process.env[`REACT_APP_${provider.toUpperCase()}_CLIENT_ID`];
      const REDIRECT_URI = process.env[`REACT_APP_${provider.toUpperCase()}_REDIRECT_URI`];
      const AUTH_URL =
        provider === 'kakao'
          ? `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
          : `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=sukream`;

      window.location.href = AUTH_URL;
    },
    []
  );

  const handleSelfLogin = () => navigate('/login');

  return (
    <Container center={true} title='SUKREAM'>
      {/* <Image src="/images/cream.png" alt="슈크림" /> */}
      <BasicButton size="full" social="kakao" shape='square' onClick={() => handleOAuth('kakao')}>
      {/* <img src="/icons/kakao.svg" alt="카카오" width="20" /> */}
      카카오로 시작하기
      </BasicButton>

      <BasicButton size="full" social="naver" shape='square' onClick={() => handleOAuth('naver')} >
      {/* <img src="/icons/naver.svg" alt="네이버" width="20" /> */}
      네이버로 시작하기
      </BasicButton>

      <BasicButton size="full" social="email" shape='square' onClick={handleSelfLogin}>
      자체 로그인
    </BasicButton>

  </Container>
  );
};