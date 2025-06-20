import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import BasicButton from '../../components/Button';
import * as S from './SelfLoginPage.styles';
import { useSignIn } from './hooks/useSignIn';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mutate: signin, isSuccess, error } = useSignIn();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setTouched({ ...touched, [field]: true });

    if (value.trim() === '') {
      setErrors({ ...errors, [field]: `${fieldNameToLabel(field)}을 입력해주세요.` });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const fieldNameToLabel = (field: string) => {
    switch (field) {
      case 'username': return '아이디';
      case 'password': return '비밀번호';
      case 'confirmPassword': return '비밀번호 재입력';
      case 'name': return '이름';
      case 'email': return '이메일';
      case 'phone': return '휴대전화 번호';
      case 'gender': return '성별';
      case 'birthYear': return '생년월일';
      default: return field;
    }
  };

  const handleSubmit = () => {
    signin(form, {
      onSuccess: (data) => {
        console.log('회원가입 성공!', data);
        // 페이지 이동 등 후처리
      },
      onError: (err) => {
        console.error('회원가입 실패:', err);
      },
    });
  };

  return (
    <Container showBackButton={true} title="일반 회원가입">
      <S.Title>일반 회원가입</S.Title>

      <S.InputWrapper>
        <S.Label>아이디 *</S.Label>
        <S.StyledInput
          value={form.username}
          onChange={(e) => handleChange('username', e.target.value)}
          placeholder="예) creampuff123"
        />
        {touched.username && errors.username && <S.ErrorMessage>{errors.username}</S.ErrorMessage>}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>비밀번호 *</S.Label>
        <S.StyledInput
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="비밀번호 (8~15자 영문+숫자+특수문자 조합)"
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.StyledInput
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="비밀번호 재입력"
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>이름 *</S.Label>
        <S.StyledInput
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="예) 홍길동"
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>이메일 *</S.Label>
        <S.StyledInput
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="예) creampuff123@gmail.com"
        />
        {touched.email && errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>휴대전화 번호 *</S.Label>
        <S.StyledInput
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="예) 010-1234-5678"
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>성별 *</S.Label>
        <S.GenderWrapper>
          <S.GenderButton
            selected={form.gender === 'male'}
            onClick={() => handleChange('gender', 'male')}
          >
            남성
          </S.GenderButton>
          <S.GenderButton
            selected={form.gender === 'female'}
            onClick={() => handleChange('gender', 'female')}
          >
            여성
          </S.GenderButton>
        </S.GenderWrapper>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>생년월일 *</S.Label>
        <S.BirthRow>
          <S.BirthInput
            value={form.birthYear}
            onChange={(e) => handleChange('birthYear', e.target.value)}
            placeholder="2000"
          />
          <span>년</span>
          <S.BirthInput
            value={form.birthMonth}
            onChange={(e) => handleChange('birthMonth', e.target.value)}
            placeholder="01"
          />
          <span>월</span>
          <S.BirthInput
            value={form.birthDay}
            onChange={(e) => handleChange('birthDay', e.target.value)}
            placeholder="01"
          />
          <span>일</span>
        </S.BirthRow>
      </S.InputWrapper>

      <BasicButton size="full" shape="square" social="email" onClick={handleSubmit}>
        회원가입
      </BasicButton>
    </Container>
  );
};
