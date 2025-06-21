import { atom } from 'recoil';
import dayjs from 'dayjs';


/** 모달 온/오프 상태 */
export const modalState = atom<boolean>({
	key: 'modalState',
	default: false,
});

export const confirmModalState = atom<boolean>({
	key: 'confirmModalState',
	default: false,
});

export const infoModalState = atom<boolean>({
	key: 'infoModalState',
	default: false,
});

export const authModelState = atom<boolean>({
	key: 'authModelState',
	default: false,
});

export const logoutModelState = atom<boolean>({
	key: 'logoutModelState',
	default: false,
});

export const secondModalState = atom<boolean>({
	key: 'secondModalState',
	default: false,
});

export const thirdModalState = atom<boolean>({
	key: 'thirdModalState',
	default: false,
});

export const fourthModalState = atom<boolean>({
	key: 'fourthModalState',
	default: false,
});

export const loginErrorMessageState = atom({
	key: 'loginErrorMessageState',
	default: undefined,
});

export const showState = atom<boolean>({
	key: 'showState',
	default: false,
});

export const profileUrlState = atom<string | undefined>({
	key: 'profileUrlState',
	default: undefined,
});

export const isSavedState = atom<boolean>({
	key: 'isSavedState',
	default: true,
});

