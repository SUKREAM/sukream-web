import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthVerification } from './hooks/useOAuthVerification';
import BasicButton from '../../components/Button'
import Container from '../../components/Container/Container';
import sukreamIcon from '../../assets/images/sukreamIcon.svg';
import sukreamTitle from '../../assets/images/SUKREAM.svg';
import naver from '../../assets/images/naver.svg';
import kakao from '../../assets/images/kakao.svg';
import google from '../../assets/images/google.svg';


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
    <Container center={true} title=''>
      <img src={sukreamIcon} alt="Sukream" />
      <img
      src={sukreamTitle}
      alt="SukreamTitle"
      width="50%"
      style={{ display: 'block', margin: '0 auto', padding: '0 0 100px 0' }}
      /> 

      <BasicButton size="full" social="kakao" shape='square' onClick={() => handleOAuth('kakao')}>
      <img src={kakao} alt="카카오" width="20" />
      카카오로 시작하기
      </BasicButton>

      <BasicButton size="full" social="naver" shape='square' onClick={() => handleOAuth('naver')} >
      <img src={naver} alt="네이버" width="20" />
      네이버로 시작하기
      </BasicButton>

      <BasicButton size="full" social="google" shape='square' onClick={() => handleOAuth('naver')} >
      <img src={google} alt="네이버" width="20" />
      구글로 시작하기
      </BasicButton>

      <BasicButton size="full" social="email" shape='square' onClick={handleSelfLogin}>
      자체 로그인
    </BasicButton>

  </Container>
  );
};