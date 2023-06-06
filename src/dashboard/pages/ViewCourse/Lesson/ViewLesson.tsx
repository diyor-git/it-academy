import './ViewLesson.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {Link, useParams} from 'react-router-dom';
import {
    getLessonsDetailSelector,
    getPassedContentSelector,
    getPassedLabSelector, getPassedLabTrialSelector
} from "../../../../redux/selectors/viewCourseSelectors";
import {useEffect, useState} from "react";
import {
    getLessonDetail,
    setPassedContent,
    setPassedLab,
    setPassedLabTrial
} from "../../../../redux/reducers/viewCourseReducer";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import check from '../../../../assets/icons/circleCheck.svg';
import completeChapter from '../../../../assets/image/completeChapter.svg';
import {Modal, Tooltip} from 'antd';
import hourglass from "../../../../assets/icons/hourglass.svg";
import passedLabImg from "../../../../assets/image/passedLab.svg";
import {useTranslation} from 'react-i18next';

const ViewLesson = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let params: any = useParams()
    let lesson = useAppSelector(state => getLessonsDetailSelector(state))
    let passedContent: any = useAppSelector(state => getPassedContentSelector(state))
    let passedLab: any = useAppSelector(state => getPassedLabSelector(state))
    let passedLabTrial: any = useAppSelector(state => getPassedLabTrialSelector(state))
    const [isModalVisible, setIsModalVisible] = useState(passedContent);
    const [isModalLabVisible, setIsModalLabVisible] = useState(passedLab);
    const [isModalLabTrialVisible, setIsModalLabTrialVisible] = useState(passedLabTrial);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false)
        setIsModalLabVisible(false)
        setIsModalLabTrialVisible(false)
        dispatch(setPassedContent(false))
        dispatch(setPassedLab(false))
        dispatch(setPassedLabTrial(false))
    };
    const handleCancel = () => {
        setIsModalVisible(false)
        setIsModalLabVisible(false)
        setIsModalLabTrialVisible(false)
        dispatch(setPassedContent(false))
        dispatch(setPassedLab(false))
        dispatch(setPassedLabTrial(false))
    };

    let content = lesson.theories_and_tests
    //Substitutes an icon based on content availability
    let checkAvailable = (c: any) => {
        if (c.available && !c.seen) {
            return <p>{t("noStart")}</p>
        } else if (c.available && c.seen && !c.done) {
            return <p>{t("completed")} {c.percentage}%
                ({c.completed} {t("chaptersFrom")} {c.all})</p>
        } else if (c.available && c.done && c.seen) {
            return <p>{t("completedLesson")}</p>
        } else if (!c.available) {
            return <p>{t("blocked")}</p>
        }
    }
    useEffect(() => {
        dispatch(getLessonDetail(params.id))
        return () => {
            dispatch(setPassedLabTrial(false))
        }
    }, [])

    if (lesson.length === 0) {
        return <Preloader/>
    }
    return (
        <div className='viewLesson'>
            <div className="bannerLesson">
                <img src={lesson.lesson.banner} alt="Banner"/>
                <h2 className='title'>{lesson.lesson.title}</h2>
            </div>
            <div className="content">
                {content.map((c: any, key: any) =>
                    <Link key={key}
                          to={c.available && (c.theory ? `/dashboard/theory/${c.id}` : `/dashboard/test/${c.id}`)}>

                        <div className="contentCard">
                            <Tooltip title={!c.available && t("ViewCourse:contentInOrder")}>
                                <div className="titleCard">
                                    <div className={!c.available && !c.seen ? 'blocked circle' : 'circle'}/>
                                    <div className="text">
                                        <h3 className={!c.available  ? 'blockedTitle' : 'titleContent'}>{(c.theory && c.theory.title) || (c.test && c.test.title)}</h3>
                                        <p>{c.theory ? t("ViewCourse:theory") : t("ViewCourse:test")}</p>
                                    </div>
                                </div>
                            </Tooltip>
                            <div className="progress">
                                {checkAvailable(c)}
                            </div>
                        </div>
                    </Link>
                )}
                <Modal centered className='labModal' width={900} visible={isModalVisible} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <img src={completeChapter} alt="Check"/>
                    <h2>{t("ViewCourse:completedChapter")}</h2>
                    <h2>{t("ViewCourse:completedChapter2")}</h2>
                </Modal>
                <Modal centered className='labModal modalPassed' width={900} visible={isModalLabVisible} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <img src={passedLabImg} alt="Hourglass"/>
                    <h2>{t("ViewCourse:labVerification")}</h2>
                    <h2><span>{t("ViewCourse:labVerification2")}</span></h2>
                    <h2>{t("ViewCourse:labVerification3")}</h2>
                </Modal>
                <Modal centered className='labModal' width={900} visible={isModalLabTrialVisible} onOk={handleOk}
                       onCancel={handleCancel} footer={null}>
                    <img src={check} alt="Check"/>
                    <h2>{t("ViewCourse:completedTrial")} <Link to='/dashboard/allCourses'>{t("here")}</Link></h2>
                </Modal>
            </div>
        </div>
    )
}
export default ViewLesson