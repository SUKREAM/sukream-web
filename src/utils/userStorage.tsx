import { User } from '../types/interface/User';

const USER_LOCALSTORAGE_KEY = 'user';
const USER_JWT_TOKEN = 'jwt';

export function getStoredUser(): User | null {
    const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (storedUser) {
        try {
            return JSON.parse(storedUser); 
        } catch (error) {
            return null; 
        }
    }
    return null;
}


export function getStoredToken(): string | null {
	const storedToken = localStorage.getItem(USER_JWT_TOKEN);
	return storedToken ? storedToken : null;
}

export function setStoredUser(user: User, jwt : string): void {
	localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
	localStorage.setItem(USER_JWT_TOKEN, jwt);
}

export function clearStoredUser(): void {
	localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
