import React from 'react';
import Header from '../components/Header'
import BodyCategories from '../components/BodyCategories'

import InicialBody from '../components/InicialBody'
import Body from '../components/Body'
import BodyDown from '../components/BodyDown'
import Footer from '../components/Footer'
import auth from "../utils/auth";

import FaqCandidates from './faqsCandidates'

const home = () => {
    return (
        <div>
            {console.log(auth.isAuthenticated())}
            <Header />
            {/* <FaqCandidates /> */}
            <InicialBody />
            <Body />
            <BodyCategories />
            <BodyDown />
            <Footer />
        </div>
    );
};

export default home;