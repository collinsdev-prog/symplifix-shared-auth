import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./AutoAndMachineries.css";
import "../Sharedstyles/Sharedstyles.css";
import Machinery1 from "../../../../assets/HeroImages/machinary 1.jpg";
import Machinery2 from "../../../../assets/HeroImages/Machinery 2.jpg";
import Machinery3 from "../../../../assets/HeroImages/Machinery 3.jpg";
import Machinery4 from "../../../../assets/HeroImages/machinary 1.jpg";

const AutoAndMachineries = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = [
    { src: Machinery1, alt: "Machinery 1" },
    { src: Machinery2, alt: "Machinery 2" },
    { src: Machinery3, alt: "Machinery 3" },
    { src: Machinery4, alt: "Machinery 4" },
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
      <div className="section">
        <div className="header_button">
          <h3>Automobiles and Machineries</h3>
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
          <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
        </Modal>
      </div>
    </section>
  );
};

export default AutoAndMachineries;
