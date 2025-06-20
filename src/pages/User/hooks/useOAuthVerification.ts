import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

interface OAuthParams {
    provider: string;
    code: string;
}

export const useOAuthVerification = () => {
    return useMutation({
    mutationFn: async ({ provider, code }: OAuthParams) => {
        const { data } = await axiosInstance.post(
        API_LOGIN.getOAuthVerification(provider, code)
        );
        return data;
    },
    });
};