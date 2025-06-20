import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

interface SignInParams {
    email: string;
    pw: string;
    username: string;
}

export const useSignIn = () => {
    return useMutation({
        mutationFn: async (params: SignInParams) => {
        const { data } = await axiosInstance.post(API_LOGIN.getSignin, params);
        return data;
        },
    });
};