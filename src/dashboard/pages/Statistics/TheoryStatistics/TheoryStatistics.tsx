import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsTheory} from "../../../../redux/reducers/coursesReducer"
import {getStatisticsTheorySelector} from "../../../../redux/selectors/coursesSelectors";
import {Table} from 'antd'
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import theoryIcon from "../../../../assets/icons/theoryIcon.svg";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";

const TheoryStatistics = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const theory = useAppSelector(state => getStatisticsTheorySelector(state))
    useEffect(() => {
        dispatch(getStatisticsTheory(params.id))
    }, [])

    let checkTheory = (data: any) => {
        if (data.avg_try) {
            return `/dashboard/labChapterStatistics/${data.id}`
        } else if (!data.avg_try && data.avg_done) {
            return `/dashboard/theoryChapterStatistics/${data.id}?intro=false`
        } else {
            return `/dashboard/theoryChapterStatistics/${data.id}?intro=true`
        }
    }
    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            width: 350,
            // @ts-ignore
            render: (title, data) => (
                <Link
                    to={checkTheory(data)}>
                    <div className='lessonTitle'>
                        <img src={theoryIcon} alt="Icon"/>
                        <p>{title}</p>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Среднее время',
            dataIndex: 'avg_done',
            width: 250,
            render: (avg_done: any) => (
                <Timer
                    initialTime={avg_done * 1000}
                    startImmediately={false}
                >
                    {() => (
                        <div className='timer'>
                            <p><Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин: <Timer.Seconds/>сек</p>
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
        {
            title: 'Баллов',
            dataIndex: 'avg_points',
        },
        {
            title: 'Попыток',
            dataIndex: 'avg_try',
        }
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }

    if (!theory) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика '{theory.title}'</h2>
            {/*// @ts-ignore*/}
            <Table columns={columns} pagination={false} scroll={{y: 540}} dataSource={theory.inside}/>
        </div>
    )
}
export default TheoryStatistics