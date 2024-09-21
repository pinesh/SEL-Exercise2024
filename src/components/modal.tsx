import React, {useRef, useEffect} from 'react';
import {ModalProps} from '../models/task.model'


/**
 * Quick and dirty modal implementation using the newer <dialog> element.
 * @param isOpen pass through for the <dialog> open property
 * @param onClose on close callback
 * @param children react element
 * @param title Modal title
 */
export function Modal({isOpen, onClose, children, title}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (!dialogElement) return;
        isOpen ? dialogElement.showModal() : dialogElement.close()
    }, [isOpen]);

    //handle a hide on backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    // Fix for escape key usage with the <dialog/> component where escaping would close it but not inform React state.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    return <dialog aria-label="modal" className="modal" ref={dialogRef} onKeyDown={handleKeyDown} onClick={handleBackdropClick}>
        {title && (
            <h3 className="modal-title">{title}</h3>
        )}
        <button onClick={onClose} className="close-button">&times;</button>
        {children}
    </dialog>
}
