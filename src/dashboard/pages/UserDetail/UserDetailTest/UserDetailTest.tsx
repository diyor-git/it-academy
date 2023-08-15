import '../../Statistics/Statistics.scss'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks"
import {useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {getStatisticsUserTest} from "../../../../redux/reducers/coursesReducer"
import {getStatisticsUserTestSelector} from "../../../../redux/selectors/coursesSelectors";
import {Table} from 'antd'
import 'moment/locale/ru'
import {useTranslation} from 'react-i18next'
import Timer from "react-compound-timer";
import testsIcon from "../../../../assets/icons/testsIcon.svg";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";

const UserDetailTest = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    const params: any = useParams()
    const test = useAppSelector(state => getStatisticsUserTestSelector(state))

    useEffect(() => {
        dispatch(getStatisticsUserTest(params.id))
    }, [])

    const columns = [
        {
            title: 'Название',
            dataIndex: 'title',
            width: 250,
            render: (title: any, data: any) => (
                <div className='lessonTitle'>
                    <img src={testsIcon} alt="Icon"/>
                    <p>{title}</p>
                </div>
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
                            <p><Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин: <Timer.Seconds/>сек</p>
                        </div>
                    )}
                </Timer>
            ),
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student') {
        navigate('/dashboard/')
    }
    if (!test) {
        return <Preloader/>
    }
    return (
        <div className='createLesson'>
            <h2 className='title'>Статистика ученика в '{test.title}'</h2>
            <Timer
                initialTime={test.complete_time * 1000}
                startImmediately={false}
                direction="backward"
            >
                {() => (
                    <div className='timer'>
                        <h3>Время прохождения
                            курса: <Timer.Days/>д: <Timer.Hours/>ч: <Timer.Minutes/>мин: <Timer.Seconds/>сек</h3>
                    </div>
                )}
            </Timer>
            {/*// @ts-ignore*/}
            <Table columns={columns} dataSource={test.inside} pagination={false} scroll={{y: 540}}/>
        </div>
    )
}
export default UserDetailTest