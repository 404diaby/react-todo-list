import React from "react";


/**
* A modal component that can be used to display content on top of the main application.
 *
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {function} onClose - A function to be called when the modal is closed.
 * @param {ReactNode} children - The content to be displayed inside the modal
 * 
 * @returns {ReactElement} A modal component.
 */
const Modal = ({ isOpen, onClose, children }) => {


    return (
        <>

            {isOpen ? (
                <div className="my-modal" >
                    <div className=" modal-background container-fluid min-vh-100 d-flex justify-content-center align-items-center" onClick={onClose}>
                        <div className="modal-xl my-modal-content">
                            {children}
                        </div>
                    </div>
                </div >)
                : (null)}
        </>
    )
}

export default Modal;