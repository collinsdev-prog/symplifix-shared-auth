import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './WarehouseAndStorage.css';
import '../Sharedstyles/Sharedstyles.css';
import WarehouseImage1 from '../../../../assets/HeroImages/BackgroundImage.jpeg';
import WarehouseImage2 from '../../../../assets/HeroImages/BackgroundImage.jpeg';
import WarehouseImage3 from '../../../../assets/HeroImages/BackgroundImage.jpeg';
import WarehouseImage4 from '../../../../assets/HeroImages/BackgroundImage.jpeg';

const WarehouseAndStorage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const images = [
    { src: WarehouseImage1, alt: 'Warehouse 1' },
    { src: WarehouseImage2, alt: 'Warehouse 2' },
    { src: WarehouseImage3, alt: 'Warehouse 3' },
    { src: WarehouseImage4, alt: 'Warehouse 4' },
  ];

  const handlePreview = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="section_wrapper">
      <h2 className="warehouse__looking_for_title">What Are You Looking For?</h2>
      <div className="section">
        <div className='header_button'>
        <h3>Warehousing and Storage</h3>
          <Button className="view_more">View More</Button>
          </div>
        <div className="image_gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => handlePreview(image.src)}
              className="gallery_img"
            />
          ))}
        </div>
        <Modal open={isModalVisible} footer={null} onCancel={handleCancel}>
          <img src={selectedImage} alt="Preview" style={{ width: '100%' }} />
        </Modal>
      </div>
    </section>
  );
};

export default WarehouseAndStorage;
