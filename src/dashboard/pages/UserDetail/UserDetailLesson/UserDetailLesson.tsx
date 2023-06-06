import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsUserLesson} from "../../../../redux/reducers/coursesReducer"
import {getStatisticsUserLessonSelector} from "../../../../redux/selectors/coursesSelectors";
import {Table} from 'antd'
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import theoryIcon from "../../../../assets/icons/theoryIcon.svg";
import testsIcon from "../../../../assets/icons/testsIcon.svg";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import moment from "moment";

const UserDetailLesson = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params: any = useParams()
    const permission = useAppSelector(state => getPermission(state))
    const lesson = useAppSelector(state => getStatisticsUserLessonSelector(state))

    useEffect(() => {
        dispatch(getStatisticsUserLesson(params.id))
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
            render: (title: any, data: any) => (
                data.type === 'Theory' ?
                    <Link to={`/dashboard/userDetailTheory/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={theoryIcon} alt="Icon"/>
                            <p>{title}</p>
                        </div>
                    </Link> :
                    <Link to={`/dashboard/userDetailTest/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={testsIcon} alt="Icon"/>
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
        {
            title: 'Попыток',
            // width: 200,
            dataIndex: 'trying',
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }
    if (!lesson) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика студента в '{lesson?.title}'</h2>
            <Timer
                initialTime={lesson.complete_time * 1000}
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
            <Table columns={columns} dataSource={lesson.inside} pagination={false} scroll={{y: 540}}/>
        </div>
    )
}
export default UserDetailLesson