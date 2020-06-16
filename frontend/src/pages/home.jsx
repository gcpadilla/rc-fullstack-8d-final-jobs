import React from 'react';
import Header from '../components/Header'
import BodyCategories from '../components/BodyCategories'

import Body from '../components/Body'

const home = () => {
    return (
        <div>
            <Header />
            <Body />
            <BodyCategories />

            <h1>home</h1>
        </div>
    );
};

export default home;