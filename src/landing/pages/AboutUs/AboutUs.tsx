import './AboutUs.scss'
import Header from "../../components/Header/Header";
import It from '../../components/It/It';
import Growth from "../../components/Growth/Growth";
import Achievements from "../../components/Achievements/Achievements";
import ContactForm from "../../components/ContactForm/ContactForm";
import {useTranslation} from "react-i18next";
import FooterAcademy from "../../components/FooterAcademy/FooterAcademy";
import React from "react";

const AboutUs = () => {
    const {t} = useTranslation()
    return (
        <div className='aboutUs'>
            <section className="landingBanner">
                <Header/>
                <div className="container">
                    <div className="text">
                        <h1>{t('mission')}</h1>
                        <h2>{t('about1')}</h2>
                        <h3>{t('about2')}</h3>
                    </div>
                </div>
            </section>
            <It/>
            <Growth/>
            <Achievements/>
            <ContactForm/>
            <FooterAcademy/>
        </div>
    )
}

export default AboutUs