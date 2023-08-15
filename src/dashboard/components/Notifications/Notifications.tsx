import '../HeaderDashboard/HeaderDashboard.scss'
import {Drawer} from "antd";
import React from "react";
import {setNotificationsOpen} from "../../../redux/reducers/usersReducer";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getNotificationListSelector, getNotificationsOpenSelector} from "../../../redux/selectors/usersSelectors";
import moment from "moment";
import timeOver from "../../../assets/icons/timeOver.svg";
import info from "../../../assets/icons/infoIcon.svg";
import lightning from "../../../assets/icons/lightningIcon.svg";
import airplane from "../../../assets/icons/airplane.svg";
import bell from "../../../assets/icons/bell.svg";
import rocket from "../../../assets/icons/rocket.svg";
import like from "../../../assets/icons/like.svg";
import fire from "../../../assets/icons/fireIcon.svg";
import repeat from "../../../assets/icons/repeat.svg";

const Notifications = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let notifications = useAppSelector(state => getNotificationListSelector(state))
    let notificationsOpen = useAppSelector(state => getNotificationsOpenSelector(state))
    const onClose = () => {
        dispatch(setNotificationsOpen(false))
    };

    //FOR TEST ALL AND NEW NOTIFICATIONS
    // let notification = [
    //     {type: 0, course: 'Курс', created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 1},
    //     {type: 2, lesson: "Lesson", course: 'Course', created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 3, created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 4, full_name: 'NAME', lesson:"LESSON", course:"COURSE", created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 5, course:"COURSE", created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 6, course:"COURSE", created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 7, lesson:"LESSON", course:"COURSE", created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 8, created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 9, created_at: "2021-09-28T22:30:17.869593+05:00"},
    //     {type: 10, course:"COURSE", created_at: "2021-09-28T22:30:17.869593+05:00"},
    // ]

    let time = (n: any) => {
        return moment(n.created_at).locale('ru').format('LLL')
    }
    let textNotifications = (n: any) => {
        if (n.type === 0) {
            return <div className='notification'>
                <img src={timeOver} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:subscription")} <span
                        className='violet'>"{n.course}"</span> {t("Notifications:subscriptionEnd")}</p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 1) {
            return <div className='notification'>
                <img src={info} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:buyCourseForLesson")}</p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 2) {
            return <div className='notification'>
                <img src={lightning} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:openLesson")} <span
                        className='violet'>"{n.lesson}"</span> {t("Notifications:inCourse")} <span
                        className='violet'>"{n.course}"</span></p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 3) {
            return <div className='notification'>
                <img src={airplane} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:checkLab")}</p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 4) {
            return <div className='notification'>
                <img src={bell} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:needCheck")} <span
                        className='violet'>{n.full_name}</span> {t("Notifications:byLesson")} <span
                        className='violet'>"{n.lesson}"</span> {t("Notifications:fromCourse")} <span
                        className='violet'>"{n.course}"</span></p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 5) {
            return <div className='notification'>
                <img src={rocket} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:youPurchased")} <span
                        className='violet'>"{n.course}"</span> {t("Notifications:for30Days")}</p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 6) {
            return <div className='notification'>
                <img src={like} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:haveTrialCourse")} <span className='violet'>"{n.course}"</span></p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 7) {
            return <div className='notification'>
                <img src={fire} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:newLesson")} <span
                        className='violet'>"{n.lesson}"</span> {t("Notifications:inCourse")} <span
                        className='violet'>"{n.course}"</span></p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 8) {
            return <div className='notification'>
                <img src={info} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:buyCourseForLab")}</p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
        if (n.type === 9) {
            return <div className='notification'>
                <img src={repeat} alt="Icon"/>
                <div className="text">
                    <p>{t("Notifications:course")} <span
                        className='violet'>"{n.course}"</span> {t("Notifications:extended")} {t("Notifications:for30Days")}
                    </p>
                    <span>{time(n)}</span>
                </div>
            </div>
        }
    }
    return (
        <div>
            <Drawer className='notificationsMenu' title={t("Notifications:notifications")} placement="right"
                    onClose={onClose}
                    visible={notificationsOpen}>
                {notifications.length > 0 ? notifications.map((n: any, key: number) => textNotifications(n)) :
                    <p className='noNotifications'>{t("Notifications:noNotifications")}</p>}
            </Drawer>
        </div>
    )
}

export default Notifications