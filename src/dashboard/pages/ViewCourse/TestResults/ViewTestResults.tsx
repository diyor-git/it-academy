import './ViewTestResults.scss'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {useNavigate, useParams} from 'react-router-dom';
import {clearTestPoints, getTestPoints} from "../../../../redux/reducers/viewCourseReducer";
import {getTestResultsSelector} from "../../../../redux/selectors/viewCourseSelectors";
import {setSelectedChapter} from "../../../../redux/reducers/coursesReducer";
import {isSidebar} from "../../../../redux/reducers/authorizationReducer";
import {Progress, Tooltip} from 'antd';
import check from '../../../../assets/icons/check.svg'
import cross from '../../../../assets/icons/cross.svg'
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {useTranslation} from 'react-i18next';
import {useMediaQuery} from 'react-responsive'

const ViewTestResults = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let params: any = useParams()
    let navigate: any = useNavigate()
    let results: any = useAppSelector(state => getTestResultsSelector(state))
    const isTablet = useMediaQuery({query: '(max-width: 1199px)'})

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        dispatch(isSidebar('closeSidebar'))
        dispatch(getTestPoints(params.id))
    }, [])

    useEffect((): any => {
        return () => {
            dispatch(setSelectedChapter(''))
            isTablet ? dispatch(isSidebar('closeSidebar')) : dispatch(isSidebar('studentSidebar'))
            dispatch(clearTestPoints())
        }
    }, [])

    if (!results) {
        return <Preloader/>
    }

    return (
        <div className='viewTestResults'>
            <div className="score">
                <Tooltip title={!results.control && `${t("ViewCourse:passingScore")} ${results.minimum_points}%`}>
                    <Progress strokeColor={{
                        '0%': '#6A12CC',
                        '100%': '#FFD200',
                    }} percent={results.points} className='progress' type="dashboard"
                              format={(percent) => <div className='result'>
                                  {results.enough ? <img src={check} alt="Good"/>
                                      : <img src={cross} alt="Bad"/>}
                                  <p>{t("ViewCourse:result")}:</p>
                                  <h2>{percent}%</h2>
                              </div>}
                    />
                </Tooltip>
                <div className="description">
                    {results.enough ? <>
                            <h2>{t("ViewCourse:congratulations")}!</h2>
                            <p>{t("ViewCourse:successfulTest")}</p></>
                        : <>
                            <h2>{t("ViewCourse:notPassTest")}</h2>
                            <p>{t("ViewCourse:unablePassTest")}</p>
                        </>}
                    <button onClick={() => {
                        navigate(`/dashboard/lesson/${results.lesson}`)
                    }}>{t("ViewCourse:backToLessons")}</button>
                </div>
            </div>
        </div>
    )
}

export default ViewTestResults