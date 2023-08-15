import "./CourseList.scss";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useEffect} from "react";
import {getLandingCoursesSelector} from "../../../redux/selectors/landingSelectors";
import {getLandingCourses} from "../../../redux/reducers/landingReducer";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import moment from "moment";
import {useTranslation} from "react-i18next";

const CourseList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const courses = useAppSelector(state => getLandingCoursesSelector(state))
    useEffect(() => {
        dispatch(getLandingCourses())
    }, [])
    if (!courses) {
        return <Preloader/>
    }
    return (
        <section className="courseList">
            <div className="container">
                <h2 className="title">{t("ourCourses")}</h2>
                <div className="courses">
                    {courses.map((c, key: number) =>
                        <Link key={key} to={`/course/${c.id}`}>
                            <div className="course">
                                <h2>{c.title}</h2>
                                <h3>{t('developer')}</h3>
                                <hr/>
                                <p>{t('startGroup')}</p>
                                <span>{c.start ? moment(c.start).format('DD.MM.YYYY') : t('soon')}</span>
                            </div>
                        </Link>
                        )}
                </div>
            </div>
        </section>
    );
};
export default CourseList;