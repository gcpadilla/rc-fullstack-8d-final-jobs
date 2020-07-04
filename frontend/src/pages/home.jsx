import React from 'react';
import Header from '../components/Header'
import BodyCategories from '../components/BodyCategories'

import InicialBody from '../components/InicialBody'
import Body from '../components/Body'
import BodyDown from '../components/BodyDown'
import Footer from '../components/Footer'
import auth from "../utils/auth";

const Home = () => {
    return (
        <div>
            {console.log(auth.isAuthenticated())}
            
            <InicialBody />
            <Header />
            <Body />
            <BodyCategories />
            <BodyDown />
            <Footer />
        </div>
    );
};

export default Home;