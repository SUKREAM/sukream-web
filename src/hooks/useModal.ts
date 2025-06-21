// src/stores/useModalStore.ts
import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    isSecondOpen: boolean;
    isThirdOpen: boolean;
    isFouthOpen: boolean;
    isConfirmOpen: boolean;
    isInfoOpen: boolean;
    isAuthOpen: boolean;

    modalOpen: () => void;
    onClose: () => void;

    secondModalOpen: () => void;
    onSecondClose: () => void;

    thirdModalOpen: () => void;
    onThirdClose: () => void;

    fourthModalOpen: () => void;
    onFourthClose: () => void;

    confirmModalOpen: () => void;
    onConfirmClose: () => void;

    infoModalOpen: () => void;
    onInfoClose: () => void;

    authModalOpen: () => void;
    onAuthClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
    isOpen: false,
    isSecondOpen: false,
    isThirdOpen: false,
    isFouthOpen: false,
    isConfirmOpen: false,
    isInfoOpen: false,
    isAuthOpen: false,

    modalOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    secondModalOpen: () => set({ isSecondOpen: true }),
    onSecondClose: () => set({ isSecondOpen: false }),

    thirdModalOpen: () => set({ isThirdOpen: true }),
    onThirdClose: () => set({ isThirdOpen: false }),

    fourthModalOpen: () => set({ isFouthOpen: true }),
    onFourthClose: () => set({ isFouthOpen: false }),

    confirmModalOpen: () => set({ isConfirmOpen: true }),
    onConfirmClose: () => set({ isConfirmOpen: false }),

    infoModalOpen: () => set({ isInfoOpen: true }),
    onInfoClose: () => set({ isInfoOpen: false }),

    authModalOpen: () => set({ isAuthOpen: true }),
    onAuthClose: () => set({ isAuthOpen: false }),
}));
