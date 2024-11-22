import React from 'react'
import ReactDOM from "react-dom"

const ModalComponent = ({ children, onOpenChange }: { children: React.ReactNode, onOpenChange: () => void }) => {
    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center overflow-hidden'>
            <div
                onClick={onOpenChange}
                className='absolute inset-0 bg-black/70 backdrop-blur-sm'
            ></div>
            <div className='relative z-[100] md:w-[30%] w-[90%] bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}

const Modal = ({ children, onOpenChange }: { children: React.ReactNode, onOpenChange: () => void }) => {
    const modalBox = document.getElementById("modal-box")!;
    return ReactDOM.createPortal((<ModalComponent onOpenChange={onOpenChange}>{children}</ModalComponent>), modalBox)
}

export default Modal
