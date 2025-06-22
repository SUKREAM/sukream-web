import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { useOAuthVerification } from '../hooks/useOAuthVerification';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { setStoredUser } from "../../../utils/userStorage";
import { useGetUserInfo } from '../../../pages/MyPage/hooks/useGetUserInfo';

    export const OAuthModal = () => {
    const { isThirdOpen, onThirdClose } = useModal();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const provider = localStorage.getItem('oauth_provider');
    const navigate = useNavigate();
    const { data: userInfo} = useGetUserInfo();

    
    const { data, isLoading, isError, isSuccess } = useOAuthVerification({
        provider: provider || '',
        code: code || '',
    });
    
    useEffect(() => {
        if (isSuccess) {
        setTimeout(() => {
            console.log("로그인 성공 {}:" + data.accessToken);
            localStorage.removeItem('oauth_provider');
            setStoredUser(userInfo, data.accessToken);
            onThirdClose();        
            navigate('/main');      
        }, 1500);
        }
    }, [isSuccess, onThirdClose, navigate]);

    return (
        <Modal
        open={isThirdOpen}
        onClose={onThirdClose}
        title={
            isLoading
            ? '소셜 로그인 진행 중 ...'
            : isSuccess
            ? '소셜 로그인 성공! 이동 중입니다.'
            : isError
            ? '소셜 로그인에 실패했어요. 다시 시도해주세요.'
            : ''
        }
        okText='확인'
        >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0 70px 0' }}>
            <SyncLoader color='#F76059' />
        </div>
        </Modal>

    );
};
