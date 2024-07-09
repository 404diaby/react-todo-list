import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    const handleBackgroundClick = (event) => {

        if (event.target === event.currentTarget) {
            onClose();
        }
    }



    return (
        <div className="modal">
            <div className=" modal-background container-fluid min-vh-100
            d-flex justify-content-center align-items-center" onClick={onClose}>
                <div className="modal-xl modal-content">
                    {children}
                </div>
            </div>
        </div>
    )


}

export default Modal;