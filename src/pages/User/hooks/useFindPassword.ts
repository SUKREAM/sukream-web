import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

export const useFindPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
        const { data } = await axiosInstance.post(API_LOGIN.getPassword + `?email=${email}`);
        return data;
        },
    });
};
