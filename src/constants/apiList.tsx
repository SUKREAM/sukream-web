/** LOGIN */
export const API_LOGIN = {
    getLogin : '/api/auth/login',
    getSignin : '/api/auth/signin',
    getEmail : '/api/auth/find-email',
    getPassword : '/api/auth/find-pw',
    getOAuthVerification: (provider?: string, code?: string) => `/api/auth/verification/${provider}?code=${code}`
};

