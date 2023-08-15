import React, {useEffect} from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Header/Header";
import StudentsWork from "../../components/StudentsWork/StudentsWork";
import "./StudentsPortfolio.scss";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import FooterAcademy from "../../components/FooterAcademy/FooterAcademy";

const StudentsPortfolio = () => {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);
    return (
        <div className="students-portfolio">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY | Students`}</title>
            </Helmet>
            <div className="banner">
                <Header/>
                <div className="container">
                    <div className="banner-content">
                        <h2>{t('portfolioStudents')}</h2>
                        <p>{t('portfolioStudents2')}</p>
                        <div className="info">
                            <div className="card">
                                <h5>{t('total')}</h5>
                                <h6>85 {t('students1')}</h6>
                            </div>
                            <div className="card">
                                <h5>{t('search')}</h5>
                                <h6>65 {t('applicants')}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StudentsWork filters={true} button={false}/>
            <ContactForm/>
            <FooterAcademy/>
        </div>
    );
};

export default StudentsPortfolio;
