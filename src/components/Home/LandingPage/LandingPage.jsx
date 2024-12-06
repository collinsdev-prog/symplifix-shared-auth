import React from 'react';
import Header from './Header/Header';
import WarehouseAndStorage from './WarehouseAndStorage/WarehouseAndStorage';
import AutomobilesAndMachineries from './AutoAndMachineries/AutoAndMachineries';
import Footer from './Footer/Footer';
import VisitMarketPlace from './VisitMarketPlace/VisitMarketPlace';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landingpage'>
      <Header />
      <WarehouseAndStorage />
      <AutomobilesAndMachineries />
      <VisitMarketPlace />
      <Footer />
    </div>
  );
};

export default LandingPage;
