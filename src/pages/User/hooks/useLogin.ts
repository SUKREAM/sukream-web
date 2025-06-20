import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

interface LoginParams {
    email?: string;
    pw?: string;
}

const getLogin = async (loginParams?: LoginParams) => {
    const { data } = await axiosInstance.post(API_LOGIN.getLogin, loginParams);
    return data;
};

export const useLogin = (loginParams: LoginParams) => {
    const queryOptions = {
    queryKey: ['login', loginParams.email, loginParams.pw],
    queryFn: () => getLogin(loginParams),
    enabled: !!loginParams.email && !!loginParams.pw, 
    };

    const { data: login, error, isLoading } = useQuery(queryOptions);

    return { login, error, isLoading };
};
