import "./Landing.scss";
import Header from "../../components/Header/Header";
import Direction from "../../components/Direction/Direction";
import WhyWe from "../../components/WhyWe/WhyWe";
import HelpEmployment from "../../components/HelpEmployment/HelpEmployment";
import OurPartners from "../../components/OurPartners/OurPartners";
import ReviewsStudents from "../../components/ReviewsStudents/ReviewsStudents";
import direction1 from "../../../assets/image/direction1.png";
import direction2 from "../../../assets/image/direction2.png";
import ReviewsMedia from "../../components/ReviewsMedia/ReviewsMedia";
import BlogShortList from "../../components/BlogShortList/BlogShortList";
import ContactForm from "../../components/ContactForm/ContactForm";
import StudentsWork from "../../components/StudentsWork/StudentsWork";
import CourseList from "../../components/CourseList/CourseList";
import {useTranslation} from "react-i18next";

const Landing = () => {
    const {t} = useTranslation()

  return (
    <div className="landing">
      <section className="landingBanner">
        <Header />
        <div className="container">
          <div className="text">
            <h1>{t('ourMission')}</h1>
          </div>
        </div>
      </section>
      <CourseList />
      <Direction
        title={t('direction1')}
        img={direction1}
        subtitle={t('direction2')}
      />
      <WhyWe />
      <HelpEmployment />
      <OurPartners />
      <ReviewsStudents />
      <Direction
        title={t('direction3')}
        img={direction2}
      />
      <StudentsWork works={3} />
      <ReviewsMedia />
      <BlogShortList />
      <ContactForm />
    </div>
  );
};

export default Landing;
