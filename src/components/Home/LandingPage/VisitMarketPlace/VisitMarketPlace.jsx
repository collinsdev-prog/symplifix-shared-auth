import React from 'react';
import { Button } from 'antd';
import './VisitMarketPlace.css';
import FreshVegetables from '../../../../assets/HeroImages/Tomatoes.png'
import GrainsImage from '../../../../assets/HeroImages/Grains.png'

const VisitMarketPlace = () => {
  return (
    <section className="marketplace_container">
      <section className="hero_section">
        <div className="hero_content">
          <h1>Looking for Fresh Farm Produce?</h1>
          <p>All produce are quality tested, dispatch ready, and delivery efficient.</p>
          <Button className="visit_button">Visit MarketPlace</Button>
        </div>
      </section>

      <section className="preview_sections">
        <article className="preview_item">
          <img
            src={FreshVegetables}
            alt="Fresh Vegetables"
            className="preview_image"
          />
          <div className="overlay">
            <p>Fresh Vegetables</p>
          </div>
        </article>
        <article className="preview_item">
          <img
            src={GrainsImage}
            alt="Grains & Legumes"
            className="preview_image"
          />
          <div className="overlay">
            <p>Grains & Legumes</p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default VisitMarketPlace;
