import React, {useEffect} from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Header/Header";
import StudentsWork from "../../components/StudentsWork/StudentsWork";
import "./StudentsPortfolio.scss";
import {useTranslation} from "react-i18next";

const StudentsPortfolio = () => {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);
    return (
        <div className="students-portfolio">
            <div className="banner">
                <Header/>
                <div className="container">
                    <div className="banner-content">
                        <h2>Портфолио студентов</h2>
                        <p>
                            Здесь собраны работы и краткие резюме лучших студентов Академии. Прежде чем попасть на сайт,
                            они выполняют крупный проект, определяющий их уровень. Тем самым, здесь собраны только те,
                            кто готов к работе в компании на должности Junior программиста.
                        </p>
                        <div className="info">
                            <div className="card">
                                <h5>Всего</h5>
                                <h6>85 студентов</h6>
                            </div>
                            <div className="card">
                                <h5>Ищут работу</h5>
                                <h6>65 соискателей</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StudentsWork filters={true} button={false}/>
            <ContactForm/>
        </div>
    );
};

export default StudentsPortfolio;
