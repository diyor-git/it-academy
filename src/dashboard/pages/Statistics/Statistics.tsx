import './Statistics.scss'
import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect} from "react"
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {useTranslation} from "react-i18next";
import CardStatistics from "../../components/CardStatistics/CardStatistics";
import CardCourseStatistics from "../../components/CardCourseStatistics/CardCourseStatistics";
import {getStatisticsCourses, getStatisticsTotal, StatisticsTotalType} from "../../../redux/reducers/coursesReducer";
import {getStatisticsCoursesSelector, getStatisticsTotalSelector} from "../../../redux/selectors/coursesSelectors";
import Preloader from '../../../landing/components/Preloader/Preloader';
import users from '../../../assets/icons/users.svg'
import dollar from '../../../assets/icons/dollar.svg'
import clicked from '../../../assets/icons/clicked.svg'
import {getPermission} from '../../../redux/selectors/authorizationSelectors';

const Statistics = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const total: StatisticsTotalType = useAppSelector(state => getStatisticsTotalSelector(state))
    const courses = useAppSelector(state => getStatisticsCoursesSelector(state))


    useEffect(() => {
        dispatch(getStatisticsCourses())
        dispatch(getStatisticsTotal())
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }

    if (!courses) {
        return <Preloader/>
    }


    return (
        <div className='statistics'>
            <h2 className='title'>Общая статистика</h2>
            <div className="totalStatistics">
                <Link to='/dashboard/users'>
                    <CardStatistics number={total.count_users} title={'Всего пользователей'} subtitle={'Кто именно?'}
                                    icon={users}/>
                </Link>
                <CardStatistics number={total.count_all_users_trial} data={total.all_users_trial}
                                title={'Все кто когда либо брал триал'} subtitle={'Кто именно?'} icon={clicked}/>
                <CardStatistics number={total.count_active_users_trial} data={total.active_users_trial}
                                title={'У кого активен триал'} subtitle={'Кто именно?'} icon={clicked}/>
                <CardStatistics number={total.count_all_users_bought} data={total.all_users_bought}
                                subtitle={'Кто именно?'} title={'Все кто когда либо покупал курс'} icon={dollar}/>
                <CardStatistics number={total.count_active_users_bought} data={total.active_users_bought}
                                subtitle={'Кто именно?'} title={'Активных студентов'} icon={users}/>
                <CardStatistics number={total.count_inactive_users_bought} data={total.inactive_users_bought}
                                subtitle={'Кто именно?'} title={'Не активных студентов'} icon={users}/>
            </div>
            <h2 className='title'>Статистика по курсам</h2>
            <div className="courseStatistics">
                {courses && courses.map((c: any, key: any) =>
                    <Link key={key} to={`/dashboard/courseStatistics/${c.id}`}>
                        <CardCourseStatistics
                            title={c.title_lms}
                            image={c.image_lms}
                            author={c.author}
                            bought={c.bought}
                            trial={c.trial}
                            lessons={c.lesson_count}
                            mentors={c.mentor_count}
                            gpa={c.avg_gpa}
                            points={c.avg_points}
                            best_points={c.best_points}
                            best_gpa={c.best_gpa}
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Statistics