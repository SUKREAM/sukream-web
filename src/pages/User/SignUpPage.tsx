import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import BasicButton from '../../components/Button';
import * as S from './SelfLoginPage.styles';
import { useSignIn } from './hooks/useSignIn';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });

  const isPasswordValid = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/.test(password);
  
  const isPhoneNumberValid = (phone: string) =>
    /^010-\d{4}-\d{4}$/.test(phone);
  

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mutate: signin, isSuccess, error } = useSignIn();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setTouched({ ...touched, [field]: true });
  
    const newErrors = { ...errors };
  
    if (value.trim() === '') {
      newErrors[field] = `${fieldNameToLabel(field)}을 입력해주세요.`;
    } else {
      delete newErrors[field];
  
      if (field === 'password') {
        if (!isPasswordValid(value)) {
          newErrors.password = '비밀번호는 8~15자 영문+숫자+특수문자 조합이어야 합니다.';
        } else {
          delete newErrors.password;
        }
  
        if (form.confirmPassword && value !== form.confirmPassword) {
          newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        } else if (form.confirmPassword && value === form.confirmPassword) {
          delete newErrors.confirmPassword;
        }
      }

      if (field === 'phoneNumber') {
        if (!isPhoneNumberValid(value)) {
          newErrors.phoneNumber = '휴대전화 번호는 010-0000-0000 형식이어야 합니다.';
        } else {
          delete newErrors.phoneNumber;
        }
      }
    }
  
    setErrors(newErrors);
  };
  

  const isFormValid = () => {
    return (
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.name &&
      form.phoneNumber &&
      form.gender &&
      form.birthYear &&
      form.birthMonth &&
      form.birthDay &&
      isPasswordValid(form.password) &&
      form.password === form.confirmPassword &&
      Object.keys(errors).length === 0
    );
  };

  const fieldNameToLabel = (field: string) => {
    switch (field) {
      case 'password': return '비밀번호';
      case 'confirmPassword': return '비밀번호 재입력';
      case 'name': return '이름';
      case 'email': return '이메일';
      case 'phoneNumber': return '휴대전화 번호';
      case 'gender': return '성별';
      case 'birthYear': return '생년월일';
      default: return field;
    }
  };

  const handleSubmit = () => {
    signin(form, {
      onSuccess: (data) => {
        console.log('회원가입 성공!', data);
        navigate("/")
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
        <S.Label>이메일 *</S.Label>
        <S.StyledInput
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="예) creampuff123@gmail.com"
        />
        {touched.email && errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>비밀번호 *</S.Label>
        <S.StyledInput
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="비밀번호 (8~15자 영문+숫자+특수문자 조합)"
        />
        {touched.password && errors.password && (
        <S.ErrorMessage>{errors.password}</S.ErrorMessage>
        )}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.StyledInput
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="비밀번호 재입력"
        />
        {touched.confirmPassword && form.confirmPassword && (
          <S.ErrorMessage isError={form.password == form.confirmPassword}>
          {form.password === form.confirmPassword
            ? '✅ 비밀번호가 일치합니다.'
            : '❌ 비밀번호가 일치하지 않습니다.'}
          </S.ErrorMessage>
        )}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>이름 *</S.Label>
        <S.StyledInput
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="예) 홍길동"
        />
        {touched.name && errors.name && (
        <S.ErrorMessage>{errors.name}</S.ErrorMessage>
        )}
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>휴대전화 번호 *</S.Label>
        <S.StyledInput
          value={form.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          placeholder="예) 010-1234-5678"
        />
        {touched.phoneNumber && errors.phoneNumber && (
        <S.ErrorMessage>{errors.phoneNumber}</S.ErrorMessage>
        )}
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

      <BasicButton 
      size="full" 
      shape="square" 
      social="email"   
      disabled={!isFormValid()}
      onClick={handleSubmit}>
        회원가입
      </BasicButton>
    </Container>
  );
};
