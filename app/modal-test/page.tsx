"use client";

import { useModalStore } from "@/stores/useModalStore";
import Modal from "@/components/Modal";

export default function ModalTestPage() {
    const openModal = useModalStore((s) => s.openModal);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Test Modal</h1>

            <button
                onClick={() => openModal("test-modal")}
                style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                }}
            >
                Ouvrir la modal
            </button>

            <Modal id="test-modal">
                <h2>Modal ouverte !</h2>
                <p>Voici un exemple de contenu pour la modal.</p>
            </Modal>
        </div>
    );
}
