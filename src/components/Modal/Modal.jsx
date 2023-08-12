import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";

import {Overlay, ModalView } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, largeImg, tag }) => {

    const closeByEsc = (e) => {
        if (e.key === "Escape") {
            closeModal()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', closeByEsc)

        return () => { window.removeEventListener('keydown', closeByEsc) }
   
    }, []);

    return createPortal(
        <Overlay>
            <ModalView onClick={closeModal}>
                <img src={largeImg} alt={tag} />
            </ModalView>
        </Overlay>, modalRoot
    )
};

export default Modal;

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired
}