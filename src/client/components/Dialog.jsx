import React from 'react';

const Dialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button onClick={onConfirm}>Potwierdź</button>
                    <button onClick={onCancel}>Anuluj</button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
