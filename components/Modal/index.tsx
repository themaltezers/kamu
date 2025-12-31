"use client";

import styles from "@/styles/components/modal.module.scss";
import { useEffect, useRef } from "react";
import { useModalStore } from "@/stores/useModalStore";

interface ModalProps {
    id: string;
    children: React.ReactNode;
    onCloseComplete?: () => void;
    closeTo?: string;
    disableClose?: boolean;
}

export default function Modal({
    id,
    children,
    onCloseComplete,
    closeTo,
    disableClose = false,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const isOpen = useModalStore((s) => s.isOpen(id));
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isOpen]);

    const handleClose = () => {
        if (disableClose) return;

        closeModal();
        onCloseComplete?.();

        if (closeTo) {
            openModal(closeTo);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={overlayRef} className={styles.modal}>
            <div ref={modalRef}>
                {!disableClose && (
                    <div
                        className={styles.modal__close__container}
                        onClick={handleClose}
                    >
                        x
                    </div>
                )}

                <div className={styles.modal__content__inner}>{children}</div>
            </div>
        </div>
    );
}
