import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';

export const useFindEmail = () => {
    return useMutation({
        mutationFn: async (phoneNumber: string) => {
        const { data } = await axiosInstance.post(API_LOGIN.getEmail + `?phoneNumber=${phoneNumber}`);
        return data;
        },
    });
};
