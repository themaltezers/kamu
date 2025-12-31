import { create } from "zustand";

type ModalState = {
    activeModal: string | null;
    ordering?: number;

    openModal: (id: string, startOrdering?: number) => void;
    closeModal: () => void;
    isOpen: (id: string) => boolean;
    setOrdering: (ordering: number) => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
    activeModal: null,
    ordering: undefined,

    openModal: (id, startOrdering) =>
        set(() => ({
            activeModal: id,
            ordering: startOrdering,
        })),

    closeModal: () =>
        set(() => ({
            activeModal: null,
            ordering: undefined,
        })),

    isOpen: (id) => get().activeModal === id,

    setOrdering: (ordering) => set(() => ({ ordering })),
}));
