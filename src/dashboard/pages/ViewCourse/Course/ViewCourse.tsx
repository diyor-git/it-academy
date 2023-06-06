import './ViewCourse.scss'
import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {getLessonList} from "../../../../redux/reducers/viewCourseReducer";
import {getLessonsListSelector} from "../../../../redux/selectors/viewCourseSelectors";
import 'swiper/css';
import Preloader from "../../../../landing/components/Preloader/Preloader";
import blocked from '../../../../assets/icons/blocked_white.svg'
import {Tooltip} from 'antd';
import {useTranslation} from 'react-i18next';
import moment from "moment";
import Timer from "react-compound-timer";

const ViewCourse = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let params: any = useParams()
    let lessons = useAppSelector(state => getLessonsListSelector(state))

    useEffect(() => {
        dispatch(getLessonList(params.id))
    }, [])

    let checkAvailable = (l: any) => {
        if(l.available && !l.done) {
            return <>
                <p>{l.lesson.description}</p>
                <p>{t("ViewCourse:recommendEnd")}: {moment(l.recommend_end_date).format('DD.MM.YYYY')}</p>
            </>
        }
        else if (l.available && l.done) {
            return <>
                <p>{l.lesson.description}</p>
                <Timer
                    initialTime={l.complete_time * 1000}
                    startImmediately={false}
                    direction="backward"
                >
                    {() => (
                        <div className='timer'>
                            <p>{t("ViewCourse:endTime")}: <Timer.Days/>{t("days")}: <Timer.Hours/>{t("hours")}: <Timer.Minutes/>{t("minutes")}</p>
                        </div>
                    )}
                </Timer>
            </>

        } else if (l.activation_date && !l.available) {
            return <>
                <p>{t("openLesson")} <span>{moment(l.activation_date).format('DD.MM.YYYY')}</span></p>
                <p>{t("ViewCourse:recommendEnd")}: {moment(l.recommend_end_date).format('DD.MM.YYYY')}</p>
            </>

        } else if (!l.available) {
            return <p>{t("orderLesson")}</p>
        }
    }
    let checkBlocked = (l: any) => {
        if (l.activation_date && !l.available) {
            return `${t("openLesson")}  ${moment(l.activation_date).format('DD.MM.YYYY')}`
        } else if (!l.available) {
            return t("ViewCourse:lessonsInOrder")
        }
    }
    if (lessons.length === 0) {
        return <Preloader/>
    }
    return (
        <div className='viewCourse'>
            <div className="banner">
                <h2 className='title'>{lessons[0].lesson.course.title_lms}</h2>
            </div>
            <div className="content">
                {lessons.map((l: any, key: any) =>
                    <Link key={key} to={l.available && `/dashboard/lesson/${l.id}`}>
                        <div className="lessonCard">
                            <div className="cardContent">
                                <div className="preview">
                                    <img src={l.lesson.preview} alt="Preview"/>
                                    {!l.available &&
                                    <div className='blocked'>
                                        <img src={blocked} alt="Blocked"/>
                                    </div>}
                                </div>
                                <Tooltip title={checkBlocked(l)}>
                                    <div className="cardText">
                                        <h2>{l.lesson.title}</h2>
                                        {checkAvailable(l)}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    )
}

export default ViewCourse