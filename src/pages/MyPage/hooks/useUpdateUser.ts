import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../axios/axiosInstance';
import { API_LOGIN } from '../../../constants/apiList';


export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async (formData: any) => {
        const { data } = await axiosInstance.post(API_LOGIN.getUpdateUser, formData);
        return data;
        },
    });
};
