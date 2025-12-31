"use client";

import Modal from "@/components/Modal";

export function PaymentModal() {
    return (
        <Modal id="payment" disableClose>
            <h2>Paiement sécurisé</h2>

            {/* Stripe / Checkout / formulaire */}
            <div id="payment-container" />

            <p>Ne fermez pas cette fenêtre pendant le paiement.</p>
        </Modal>
    );
}
