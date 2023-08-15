import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {Link, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsTest} from "../../../../redux/reducers/coursesReducer"
import {getStatisticsTestSelector} from "../../../../redux/selectors/coursesSelectors";
import {Table} from 'antd'
import testIcon from "../../../../assets/icons/testsIcon.svg";
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";

const TestStatistics = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const tests = useAppSelector(state => getStatisticsTestSelector(state))
    useEffect(() => {
        dispatch(getStatisticsTest(params.id))
    }, [])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            width: 350,
            // @ts-ignore
            render: (title, data) => (
                <Link
                    to={data.avg_done ? `/dashboard/testChapterStatistics/${data.id}?intro=false` : `/dashboard/testChapterStatistics/${data.id}?intro=true`}>
                    <div className='lessonTitle'>
                        <img src={testIcon} alt="Icon"/>
                        <p>{title}</p>
                    </div>
                </Link>
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
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }
    if (!tests) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика '{tests.title}'</h2>
            {/*// @ts-ignore*/}
            <Table columns={columns} pagination={false} scroll={{y: 540}} dataSource={tests.inside}/>
        </div>
    )
}
export default TestStatistics