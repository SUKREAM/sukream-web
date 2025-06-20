import { getStoredToken } from '../utils/userStorage';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getStoredToken();
		if (token) {
			config.headers = config.headers || {};
			config.headers['Authorization'] = "Bearer " + token;
		}
		return config;
	},
	(error) => Promise.reject(error),
);
