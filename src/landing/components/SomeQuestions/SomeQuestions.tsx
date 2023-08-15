import React from "react";
import pen from "../../../assets/image/pen.png";
import s from "./SomeQuestions.module.scss";
import star from "../../../assets/icons/star.svg";
import btnPen from "../../../assets/image/btnPen.svg";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {sendEmail, SendEmailType} from "../../../redux/reducers/landingReducer";
import {useAppDispatch} from "../../../redux/hooks";
import {message} from "antd";


const SomeQuestions = ({stars}: any) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm<SendEmailType>();
    const onSubmit: SubmitHandler<SendEmailType> = (data) => {
        reset()
        dispatch(sendEmail(data)).then((res: any) => {
            if (res.error) {
                message.error(t('errorContact'))
            } else {
                message.success(t('successContact'))
            }
        })
    }
    return (
        <div id="someQuestion" className={s.someQuestions}>
            <div className="landing-container">
                <div className={s.someQuestionsContainer}>
                    <div className={s.someQuestionsCards}>
                        <div className={s.someQuestionsCard}>
                            <div className={s.firstCardContent}>
                                <h2>{t('getTrialLesson3')}</h2>
                                <Link to="/dashboard/allCourses">
                                    <button style={{marginTop: "57px"}} className={s.cardBtn}>
                                        <img src={btnPen} alt="Pen"/> {t('getTrialLesson2')}
                                    </button>
                                </Link>
                                <Link to="/dashboard/allCourses">
                                    <button className={s.responseCard}>{t('signTrial')}</button>
                                </Link>
                            </div>
                            <div className={s.pen}>
                                <img src={pen} alt="Pen"/>
                            </div>
                        </div>
                        <div className={s.someQuestionsCard}>
                            <h2>{t('stillQuestions')}</h2>
                            <div className={s.someQuestionsCardForm}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" placeholder={t('name')} {...register("email", {required: true})}/>
                                    {errors.email && <span className={s.error}>{t('requiredField')}</span>}
                                    <input type="tel"
                                           placeholder={t('phone')} {...register("phone", {required: true})}/>
                                    {errors.phone && <span className={s.error}>{t('requiredField')}</span>}
                                    <button type='submit'>{t('send')}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={stars === "yes" ? s.star : s.none}>
                    <img src={star} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default SomeQuestions;
