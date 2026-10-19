
import { useEffect, useRef, useState } from "react";
import "../../styles/WalletModal.css";

function WalletModal({ type, onClose }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const amountInputRef = useRef(null);
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  const isRecharge = type === "recharge";

  useEffect(() => {
    const previouslyFocused = document.activeElement;

    amountInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not(:disabled), input:not(:disabled)'
          )
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredAmount = Number(amount);

    if (
      !Number.isFinite(enteredAmount) ||
      enteredAmount <= 0 ||
      Math.round(enteredAmount * 100) !== enteredAmount * 100
    ) {
      setMessage("Enter a valid amount with up to 2 decimal places.");
      return;
    }

    // Real wallet API will be connected later.
    setMessage("Wallet transfer service is not connected yet.");
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="wallet-modal-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="wallet-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallet-modal-title"
        aria-describedby="wallet-modal-description"
      >
        <div className="wallet-modal-header">
          <div>
            <h2 id="wallet-modal-title">
              {isRecharge
                ? "Recharge WABA Wallet"
                : "Withdraw Funds"}
            </h2>

            <p id="wallet-modal-description">
              {isRecharge
                ? "Transfer funds from your Tradebox wallet."
                : "Transfer funds back to your Tradebox wallet."}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="wallet-modal-close"
            onClick={onClose}
            aria-label="Close wallet popup"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="wallet-amount">
            Enter Amount (₹)
          </label>

          <div className="wallet-modal-input">
            <span>₹</span>

            <input
              ref={amountInputRef}
              id="wallet-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                setMessage("");
              }}
              required
            />
          </div>

          {message && (
            <p className="wallet-modal-message" role="status">
              {message}
            </p>
          )}

          <div className="wallet-modal-actions">
            <button
              type="button"
              className="wallet-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="wallet-confirm-btn"
            >
              {isRecharge
                ? "Recharge Wallet"
                : "Withdraw Amount"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WalletModal;
