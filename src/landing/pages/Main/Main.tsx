import GetRecord from "../../components/GetRecord/GetRecord";
import Grafik from "../../components/Grafik/Grafik";
import Header from "../../components/MainBanner/MainBanner";
import WhatIsProgramming from "../../components/WhatIsProgramming/WhatIsProgramming";
import WhoIsThisCourseFor from "../../components/WhoIsThisCourseFor/WhoIsThisCourseFor";
import Program from "../../components/Program/Program";
import WhyCs from "../../components/WhyCs/WhyCs";
import Reviews from "../../components/Reviews/Reviews";
import SomeQuestions from "../../components/SomeQuestions/SomeQuestions";
import s from "./Main.module.scss";
import ContactForm from "../../components/ContactForm/ContactForm";

const Main = () => {

    return (
        <div className={s.main}>
            <Header/>
            <GetRecord/>
            <WhatIsProgramming/>
            <Grafik/>
            <WhoIsThisCourseFor/>
            <Program/>
            <WhyCs/>
            <Reviews theme="black" stars="yes"/>
            <SomeQuestions stars="yes"/>
            <ContactForm/>
        </div>
    );
};

export default Main;
