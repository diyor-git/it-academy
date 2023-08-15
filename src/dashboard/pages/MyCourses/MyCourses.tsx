import "./MyCourses.scss"
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useEffect} from "react";
import Card from "../../components/Card/Card";
import {BoughtCoursesType, clearBoughtCourser, getBoughtCourses} from "../../../redux/reducers/coursesReducer";
import {getBoughtCoursesSelector} from "../../../redux/selectors/coursesSelectors";
import Preloader from "../../../landing/components/Preloader/Preloader";
import {useTranslation} from "react-i18next";
import notBuy from '../../../assets/image/notBuy.png'

const MyCourses = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    let boughtCourses: any = useAppSelector(state => getBoughtCoursesSelector(state))
    let course: any = boughtCourses.courses

    useEffect(() => {
        dispatch(getBoughtCourses())
        return () => {
            dispatch(clearBoughtCourser())
        }
    }, [])
    if (!course) {
        return <Preloader/>
    }
    return (
        <div className='myCourses'>
            <div className="banner">
                <h2 className='title'>{t("myCourses")}</h2>
            </div>
            <div className="content">
                <p className='subTitle'>{t("available")} {boughtCourses.available}/{boughtCourses.all} {t("courses")}</p>
                {boughtCourses.courses.length > 0 ? course.map((c: BoughtCoursesType, key: number) =>
                        <Link to={c.status ? `/dashboard/course/${c.course}` : `/dashboard/allCourses`} key={key}>
                            <Card img={c.image_lms} title={c.title_lms} progress={c.percentage} current={c.completed} blocked={!c.status}
                                  total={c.all}/>
                        </Link>)
                    : <div>
                        <Link to='/dashboard/allCourses'>
                            <div className="notBuy">
                                <img src={notBuy} alt="Not Buy"/>
                                <h3>У вас пока нет приобретенных курсов</h3>
                                <button className='next'>Приобрести</button>
                            </div>
                        </Link>
                    </div>}
            </div>
        </div>
    )
}


export default MyCourses