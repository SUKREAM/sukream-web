import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

interface LoginParams {
    email?: string;
    pw?: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (params: LoginParams) => {
            const { data } = await axiosInstance.post(API_LOGIN.getLogin, params);
            return data;
        },
    });
};