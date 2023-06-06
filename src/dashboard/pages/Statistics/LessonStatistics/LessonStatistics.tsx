import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsLesson} from "../../../../redux/reducers/coursesReducer"
import {getStatisticsLessonSelector} from "../../../../redux/selectors/coursesSelectors";
import {Table} from 'antd'
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import theoryIcon from "../../../../assets/icons/theoryIcon.svg";
import testsIcon from "../../../../assets/icons/testsIcon.svg";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";

const LessonStatistics = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const contents = useAppSelector(state => getStatisticsLessonSelector(state))

    useEffect(() => {
        dispatch(getStatisticsLesson(params.id))
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
            width: 350,
            render: (title: any, data: any) => (
                data.type === 'Theory' ?
                    <Link to={`/dashboard/theoryStatistics/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={theoryIcon} alt="Icon"/>
                            <p>{title}</p>
                        </div>
                    </Link> :
                    <Link to={`/dashboard/testStatistics/${data.id}`}>
                        <div className='lessonTitle'>
                            <img src={testsIcon} alt="Icon"/>
                            <p>{title}</p>
                        </div>
                    </Link>
            ),
        },
        {
            title: 'Средний балл',
            // width: 200,
            dataIndex: 'avg_points',
            render: (avg_points: any) => (
                <p className={checkPoints(avg_points)}>{avg_points}</p>
            ),
        },
        {
            title: 'Среднее время',
            dataIndex: 'avg_done',
            //width: 180,
            render: (avg_done: any) => (
                <Timer
                    initialTime={avg_done * 1000}
                    startImmediately={false}
                    direction="backward"
                >
                    {() => (
                        <div className='timer'>
                            <p><Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин:</p>
                        </div>
                    )}
                </Timer>
            ),
        },
        {
            title: 'Проходят',
            dataIndex: 'doing',
            //width: 200,
            render: (doing: any) => (
                <p>{doing}</p>
            ),
        },
        {
            title: 'Прошли',
            dataIndex: 'done',
            //width: 200,
            render: (done: any) => (
                <p>{done}</p>
            ),
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }

    if (!contents) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика '{contents.title}'</h2>
            {/*// @ts-ignore*/}
            <Table columns={columns} dataSource={contents.theories_and_tests} pagination={false} scroll={{y: 540}}/>
        </div>
    )
}
export default LessonStatistics