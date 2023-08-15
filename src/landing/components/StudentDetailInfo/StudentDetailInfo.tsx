import React from "react";
import "./StudentDetailInfo.scss";
import {StudentDetailType} from "../../../redux/reducers/usersReducer";
import moment from "moment";
import {useTranslation} from "react-i18next";

type PropsType = {
    student: StudentDetailType
}
const StudentDetailInfo: React.FC<PropsType> = ({student}) => {
    const {t} = useTranslation()
    return (
        <div className="student-detail-info">
            <div className="container">
                <div className="content">
                    <div className="first-content">
                        <div className="title">
                            <h4>{student.full_name}</h4>
                            <h5>Front-end {t('developer')}</h5>
                        </div>
                        <div className="info-list">
                            <ul>
                                <li>{t('status')}:</li>
                                <li>{t('dob')}:</li>
                                <li>{t('skills')}:</li>
                                <li>{t('phone')}:</li>
                                <li>{t('email')}:</li>
                                <li>{t('telegram')}:</li>
                            </ul>
                            <ul>
                                <li>{t('status1')}</li>
                                <li>{moment(student.dob).format('DD/MM/YYYY')}</li>
                                <li>{student.skills ? student.skills : t('portfolio1')}</li>
                                <li>{student.phone ? <a target='_blank' rel='noreferrer' href={`tel:${student.phone}`}>{student.phone}</a> :  t('portfolio2')}</li>
                                <li>{student.email ? <a target='_blank' rel='noreferrer' href={`mailto:${student.email}`}>{student.email}</a> : t('portfolio3')}</li>
                                <li>{student.telegram_link ? <a target='_blank' rel='noreferrer' href={`https://t.me/${student.telegram_link}`}>Ссылка</a> : t('portfolio4')}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="second-content">
                        <img src={student.avatar} alt="Avatar"/>
                    </div>
                </div>
                <div className="student-about">
                    <h3>{t('aboutSelf')}:</h3>
                    <p>{student.about || t('portfolio5')}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailInfo;
