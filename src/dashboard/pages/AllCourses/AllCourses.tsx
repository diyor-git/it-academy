import "./AllCourses.scss"
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import React, {useEffect, useState} from "react";
import {getListAvailableCoursesSelector} from "../../../redux/selectors/landingSelectors";
import {getAvailableCourses} from "../../../redux/reducers/landingReducer";
import {useTranslation} from "react-i18next";
import {Modal} from "antd";
import {getTrial, orderClickCreate, orderPaymeCreate} from "../../../redux/reducers/coursesReducer";
import {getLoginData} from "../../../redux/selectors/authorizationSelectors";
import {getUserData} from "../../../redux/reducers/authorizationReducer";
import {getOrderClickSelector, getOrderPaymeSelector} from "../../../redux/selectors/coursesSelectors";
import notBuy from "../../../assets/image/notBuy.png";

const AllCourses = React.memo(() => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const allCourses = useAppSelector(state => getListAvailableCoursesSelector(state))
    const loginData = useAppSelector(state => getLoginData(state))
    const orderClick = useAppSelector(state => getOrderClickSelector(state))
    const orderPayme = useAppSelector(state => getOrderPaymeSelector(state))
    const [stateCourse, setStateCourse]: any = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isModalTrialVisible, setIsModalTrialVisible] = useState(false)
    let courseId: any = {course: stateCourse.id}
    let checkBuyCourse = (c: any) => {
        if (!loginData.used_trial && !c.is_bought) {
            return t("trialLesson")
        } else if (loginData.used_trial && !c.is_bought) {
            return t("buyCourse")
        } else if (c.is_bought) {
            return t("extendCourse")
        }
    }

    let checkModalBuyCourse = () => {
        if (!loginData.used_trial && !stateCourse.is_bought) {
            return <>
                <p>{t("getTrial")}</p>
                <p>{t("trialMore")} <a rel='noreferrer' href={stateCourse.github} target='_blank'>GitHub</a></p>
                <a rel='noreferrer' className='trialBtn' href={stateCourse.github} target='_blank'
                   onClick={getTrialFunc}>
                    <button className='btnSubmit'>{t("getTrialLesson")}</button>
                </a>
            </>
        } else if (loginData.used_trial && !loginData.phone) {
            return <>
                <p>{t("noPhone")} <Link to={'/dashboard/settings'}>{t("settings")}</Link> {t("noPhone2")}</p>
                <p>{t("noPhone3")}</p>
            </>
        } else if (loginData.used_trial && !stateCourse.is_bought) {
            return <>
                <p>{t("usedTrial2")}</p>
                <p>{t("trialMore")} <a rel='noreferrer' href={stateCourse.github} target='_blank'>GitHub</a></p>
                {orderClick && <>
                    <a className='trialBtn'
                       href={`https://my.click.uz/services/pay?service_id=18725&merchant_id=10143&amount=${orderClick.amount}&transaction_param=${orderClick.merchant_trans_id}&return_url=https://mate-edu.io/`}
                    >
                        <button className='btnSubmit'>{t("buyCourseClick")}</button>
                    </a>
                    <a className='trialBtn'
                       href={`https://checkout.paycom.uz/${orderPayme.base}`}>
                        <button className='btnSubmit'>{t("buyCoursePayme")}</button>
                    </a>
                </>
                }
            </>
        } else if (stateCourse.is_bought) {
            return <>
                <p>{t("extendCourseModal")}</p>
                <p>{t("trialMore")} <a rel='noreferrer' href={stateCourse.github} target='_blank'>GitHub</a></p>
                {orderClick && <>
                    <a className='trialBtn'
                       href={`https://my.click.uz/services/pay?service_id=18725&merchant_id=10143&amount=${orderClick.amount}&transaction_param=${orderClick.merchant_trans_id}&return_url=https://mate-edu.io/`}>
                        <button className='btnSubmit'>{t("extendCourseClick")}</button>
                    </a>
                    <a className='trialBtn'
                       href={`https://checkout.paycom.uz/${orderPayme.base}`}>
                        <button className='btnSubmit'>{t("extendCoursePayme")}</button>
                    </a>
                </>
                }
            </>
        }
    }
    let getTrialFunc = () => {
        setIsModalVisible(false)
        dispatch(getTrial(courseId)).then(() => {
            showModalTrial()
            dispatch(getUserData())
        })
    }

    const showModal = () => {
        setIsModalVisible(true);
    }
    const showModalTrial = () => {
        setIsModalTrialVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false)
        setIsModalTrialVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
        setIsModalTrialVisible(false)
    }
    useEffect(() => {
        dispatch(getAvailableCourses())
    }, [])
    useEffect(() => {
        let request: any = {
            course: stateCourse.id
        }
        dispatch(orderClickCreate(request))
        dispatch(orderPaymeCreate(request))
    }, [stateCourse])


    return (
        <div className='allCourses'>
            <div className="banner">
                <h2 className='title'>{t("allCourses")}</h2>
            </div>
            <div className="content">
                <div className="cards">
                    {allCourses ? allCourses.map((c: any, key: number) =>
                            <div key={key} className="cardCourses">
                                <img src={c.image_lms} alt={c.title_lms}/>
                                <div className="description">
                                    <h2>{c.title_lms}</h2>
                                    <div className="buttons">
                                        <a rel='noreferrer' href={c.github} target='_blank'>
                                            <button className='next read'>{t('more')}</button>
                                        </a>
                                        <button className='next' onClick={() => {
                                            setStateCourse(c)
                                            showModal()
                                        }}>{checkBuyCourse(c)}</button>
                                    </div>

                                </div>
                            </div>)
                        : <div>
                            <div className="notBuy">
                                <img src={notBuy} alt="Not Buy"/>
                                <h3>{t("slowInternet")}</h3>
                            </div>
                        </div>}
                </div>
            </div>

            <Modal centered title={checkBuyCourse(stateCourse)} className='modalCourses'
                   width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                {checkModalBuyCourse()}
            </Modal>
            <Modal centered title={t("trialLesson")} className='modalCourses' width={1000}
                   visible={isModalTrialVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <p>{t("usedTrial")} <Link to='/dashboard/myCourses'>{t("myCourses")}</Link>.</p>
            </Modal>
        </div>
    )
})

export default AllCourses