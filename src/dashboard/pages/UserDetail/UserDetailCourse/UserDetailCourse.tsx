import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsUserCourse} from "../../../../redux/reducers/coursesReducer"
import {Table} from 'antd'
import lessonIcon from '../../../../assets/icons/lessonIcon.svg'
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {getStatisticsUserCourseSelector} from "../../../../redux/selectors/coursesSelectors";
import moment from "moment";

const UserDetailCourse = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params: any = useParams()
    const location = useLocation()
    const query = new URLSearchParams(location.search);
    const permission = useAppSelector(state => getPermission(state))
    const course = useAppSelector(state => getStatisticsUserCourseSelector(state))

    useEffect(() => {
        let req = {
            user_id: params.id,
            course_id: query.get('course')
        }
        dispatch(getStatisticsUserCourse(req))
    }, [])

    // useEffect((): any => {
    //     return () => dispatch(clearLesson())
    // }, [])
    let checkPoints = (points: number) => {
        if (points >= 60) {
            return 'green'
        } else if (points >= 40) {
            return 'yellow'
        } else {
            return 'red'
        }
    }
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            width: 250,
            // @ts-ignore
            render: (title, data) => (
                <Link to={`/dashboard/userDetailLesson/${data.id}`}>
                    <div className='lessonTitle'>
                        <img src={lessonIcon} alt="Icon"/>
                        <p>{title}</p>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Балл',
            width: 100,
            dataIndex: 'points',
            render: (points: any) => (
                <p className={checkPoints(points)}>{points}</p>
            ),
        },
        {
            title: 'Время',
            dataIndex: 'complete_time',
            //width: 180,
            render: (complete_time: any) => (
                <Timer
                    initialTime={complete_time * 1000}
                    startImmediately={false}
                    direction="backward"
                >
                    {() => (
                        <div className='timer'>
                            <p><Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин</p>
                        </div>
                    )}
                </Timer>
            ),
        },
        {
            title: 'Начал',
            // width: 200,
            dataIndex: 'start_time',
            render: (start_time: any) => (
                <p>{start_time ? moment(start_time).format('LLL') : 'Не начинал'}</p>
            ),
        },
        {
            title: 'Закончил',
            // width: 200,
            dataIndex: 'end_time',
            render: (end_time: any) => (
                <p>{end_time ? moment(end_time).format('LLL') : 'Не закончил'}</p>
            ),
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }
    if (!course) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика студента в '{course.title}'</h2>
            <Timer
                initialTime={course.complete_time * 1000}
                startImmediately={false}
                direction="backward"
            >
                {() => (
                    <div className='timer'>
                        <h3>Время прохождения курса: <Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин</h3>
                    </div>
                )}
            </Timer>
            {/*// @ts-ignore*/}
            <Table columns={columns} dataSource={course.lessons} pagination={false} scroll={{y: 540}}/>
        </div>
    )
}
export default UserDetailCourse