import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
        const { data } = await axiosInstance.post(API_LOGIN.getUserInfo);
        return data;
        },
    });
};
