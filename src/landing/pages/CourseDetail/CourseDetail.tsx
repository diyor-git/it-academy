import "./CourseDetail.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import LearnWeb from "../../components/LernWeb/LearnWeb";
import Salary from "../../components/Salary/Salary";
import SuitableProfession from "../../components/SuitableProfession/SuitableProfession";
import CourseAdvantages from "../../components/CourseAdvantages/CourseAdvantages";
import formImg from "../../../assets/image/formImg.png";
import StudyInIT from "../../components/StudyInIT/StudyInIT";
import ContactForm from "../../components/ContactForm/ContactForm";
import FinalProject from "../../components/FinalProject/FinalProject";
import ReviewsMedia from "../../components/ReviewsMedia/ReviewsMedia";
import ChangeLives from "../../components/ChangeLives/ChangeLives";
import Direction from "../../components/Direction/Direction";
import React, {useEffect, useState} from "react";
import {Modal} from "antd";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {getLandingCourseDetail, sendEmail, SendEmailType,} from "../../../redux/reducers/landingReducer";
import {getLandingCourseDetailSelector} from "../../../redux/selectors/landingSelectors";
import Preloader from "../../components/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import moment from "moment";
import FooterAcademy from "../../components/FooterAcademy/FooterAcademy";

const CourseDetail = () => {
    const dispatch = useAppDispatch();
    const params: any = useParams();
    const course = useAppSelector((state) =>
        getLandingCourseDetailSelector(state)
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sendForm, setSendForm] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setSendForm(false);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSendForm(false);
    };

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<SendEmailType>();
    const onSubmit: SubmitHandler<SendEmailType> = (data: any) => {
        setSendForm(true);
        dispatch(sendEmail(data)).then((res: any) => {
            if (res.error) {
                setSendForm(true);
            }
        });
    };
    useEffect(() => {
        dispatch(getLandingCourseDetail(params.id));
    }, []);
    if (!course) return <Preloader/>;

    return (
        <div className="courseDetail">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY | ${course.title}`}</title>
            </Helmet>
            <section className="banner">
                <Header/>
                <div className="container">
                    <div className="text">
                        <h1>
                            {course.title} <br/> разработчик
                        </h1>
                        <div className="enroll" onClick={showModal}>
                            <Button text={"Записаться"} color={"orange"}/>
                        </div>
                    </div>
                    <div className="courses">
                        <div className="course">
                            <h2>Язык обучения</h2>
                            <span>{course.language === "ru" ? "Русский" : "Узбекский"}</span>
                        </div>
                        <div className="course active">
                            <h2>Старт группы</h2>
                            <hr/>
                            <p>Дата старта:</p>
                            <span>
                {course.start
                    ? moment(course.start).format("DD.MM.YYYY")
                    : "Скоро"}
              </span>
                        </div>
                        <div className="course">
                            <h2>Длительность</h2>
                            <span>{course.duration}</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className=" container response-courses">
                <div className="cards">
                    <div className="card">
                        <h2>Длительность</h2>
                        <br/>
                        <p>Длительность программы:</p>
                        <span>6 месяцов</span>
                    </div>
                    <div className="card">
                        <h2>Cтарт группы</h2>
                        <br/>
                        <p>Дата старта:</p>
                        <span>
              {course.start
                  ? moment(course.start).format("DD.MM.YYYY")
                  : "Скоро"}
            </span>
                    </div>
                    <div className="card">
                        <h2>Язык обучения</h2>
                        <br/>
                        <p>На выбор:</p>
                        <span>{course.language === "ru" ? "Русский" : "Узбекский"}</span>
                    </div>
                </div>
            </div>
            <LearnWeb/>
            <Salary salary={course.salary} course={course.title}/>
            <SuitableProfession course={course.title} causes={course.causes}/>
            <CourseAdvantages rises={course.rises}/>
            <Direction
                title={"Не определились с направлением?"}
                img={formImg}
                subtitle={
                    "Оставьте заявку и мы поможем подобрать то, что подходит именно вам!"
                }
            />
            <StudyInIT program={course.programs}/>
            <FinalProject/>
            <ReviewsMedia/>
            <ChangeLives/>
            <ContactForm/>
            <FooterAcademy/>
            <Modal
                width={800}
                className="courseModal"
                visible={isModalVisible}
                footer={""}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div style={{display: sendForm ? "none" : ""}}>
                    <h2 className="title">Оставить заявку</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Имя"
                            {...register("email", {required: true})}
                        />
                        <input
                            type="text"
                            placeholder="Телефон"
                            {...register("phone", {required: true})}
                        />
                        <textarea placeholder="Комментарий" {...register("comment")} />
                        <Button text={"Отправить"} color={"orange"}/>
                    </form>
                </div>
                <div className="sendForm" style={{display: !sendForm ? "none" : ""}}>
                    <h2 className="title">Спасибо за заявку</h2>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                    <div
                        onClick={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        <Button text={"Закрыть"} color={"orange"}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CourseDetail;
