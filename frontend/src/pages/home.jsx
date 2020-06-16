import React from 'react';
import Header from '../components/Header'
import BodyCategories from '../components/BodyCategories'

import Body from '../components/Body'
import BodyDown from '../components/BodyDown'
import Footer from '../components/Footer'

const home = () => {
    return (
        <div>
            <Header />
            <Body />
            <BodyCategories />
            <BodyDown />
            <Footer />
        </div>
    );
};

export default home;