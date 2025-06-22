import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

    interface OAuthParams {
    provider: string;
    code: string;
    }

    export const useOAuthVerification = ({ provider, code }: OAuthParams) => {
    return useQuery({
        queryKey: ['oauthVerification', provider, code],
        queryFn: async () => {
        const { data } = await axiosInstance.post(
            API_LOGIN.getOAuthVerification(provider, code)
        );
        return data;
        },
        enabled: !!provider && !!code, 
    });
    };
