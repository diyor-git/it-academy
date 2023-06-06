import './Profile.scss'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getProfileSelector, getProfileStatisticsSelector} from "../../../redux/selectors/usersSelectors";
import {useTranslation} from 'react-i18next';
import {Avatar} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {getProfile, getProfileStatistics} from "../../../redux/reducers/usersReducer";
import Preloader from "../../../landing/components/Preloader/Preloader";
import {Link} from 'react-router-dom';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import defaultAvatar from "../../../assets/icons/defaultAva.svg";
import {Calendar} from "@natscale/react-calendar";
import '@natscale/react-calendar/dist/main.css';
import moment from "moment";


const Profile = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    let profile: any = useAppSelector(state => getProfileSelector(state))
    let statistics: any = useAppSelector(state => getProfileStatisticsSelector(state))
    let time:any = []
    const [value, setValue] = useState('');

    const onChange = useCallback(
        (val) => {
            console.log(value)
            console.log(val)
            setValue(val);
        },
        [setValue],
    );

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getProfileStatistics()).then((data)=>{
            // @ts-ignore
            data.payload.calendar.forEach((el:any) => setValue(arr => [...arr, new Date (el.recommend_end_date)]))
        })
    }, [])

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className='profile'>
            <div className="banner">
                <div className="ava">
                    <Avatar draggable={false}
                            size={{xs: 70, sm: 80, md: 100, lg: 100, xl: 150, xxl: 200}}
                            src={profile.avatar}
                            icon={<img src={defaultAvatar} alt="Avatar"/>}/>
                    <h2>{profile.first_name} {profile.last_name}</h2>
                </div>
                <div className="settingsBtn">
                    <Link to='/dashboard/settings'>
                        <button className='next'>{t("editProfile")}</button>
                    </Link>
                </div>
            </div>
            <div className="content">
                <h2 className='title'>{t("overallRating")}</h2>
                <div className="flex">
                    <div className="chart">
                        <LineChart width={730} height={371} data={statistics.gpa_graph}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis type="number" domain={[1.0, 4.0]}/>
                            <Tooltip/>
                            <Line dot={{fill: 'black', stroke: 'black', r: 8}} dataKey="rating" stroke="#000000"/>
                        </LineChart>
                        <div className="stats">
                            <p>GPA: <span>{statistics.gpa}</span></p>
                            <p>{t("points")}: <span>{statistics.points}</span></p>
                            <p>{t("placeRating")}: <span>{statistics.position} {t("of")} {statistics.all_users}</span> </p>
                        </div>
                    </div>
                    {/*@ts-ignore*/}
                    <div className="calendar">
                        {/*@ts-ignore*/}
                        <Calendar className='calendarPanel' isMultiSelector value={value} onChange={onChange} />
                        <div className='calendarFooter'>
                            <h3>Дедлайны:</h3>
                            {/*@ts-ignore*/}
                            {statistics.calendar && statistics.calendar.map((p: any, key: any) =>
                                <p>{moment(p.recommend_end_date).format('DD.MM.YYYY')} - {p.course_title}</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile