import { useState } from "react";
import Modal from "../Modal";
import PropTypes from 'prop-types';
import { GalleryItem, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ small, large, tag }) => {
    const [isModalOpen, setisModalOpen] = useState(false);

    const toggleModal = () => {
        setisModalOpen(!isModalOpen)
    };

    return (
        <GalleryItem onClick={toggleModal}>
            <Image src={small} alt={tag} />
            {isModalOpen && <Modal largeImg={large} closeModal={toggleModal} tag={tag} />}
        </GalleryItem>
    );

};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
}