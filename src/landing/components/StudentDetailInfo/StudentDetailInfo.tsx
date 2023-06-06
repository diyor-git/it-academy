import React from "react";
import "./StudentDetailInfo.scss";
import {StudentDetailType} from "../../../redux/reducers/usersReducer";
import moment from "moment";

type PropsType = {
    student: StudentDetailType
}
const StudentDetailInfo: React.FC<PropsType> = ({student}) => {
    return (
        <div className="student-detail-info">
            <div className="container">
                <div className="content">
                    <div className="first-content">
                        <div className="title">
                            <h4>{student.full_name}</h4>
                            <h5>Front-end разработчик</h5>
                        </div>
                        <div className="info-list">
                            <ul>
                                <li>Статус:</li>
                                <li>Дата рождения:</li>
                                <li>Навыки:</li>
                                <li>Телефон:</li>
                                <li>Почта:</li>
                                <li>Telegram:</li>
                            </ul>
                            <ul>
                                <li>Обучается</li>
                                <li>{moment(student.dob).format('DD/MM/YYYY')}</li>
                                <li>{student.skills ? student.skills : 'Студент не указал скиллы'}</li>
                                <li>{student.phone ? <a target='_blank' rel='noreferrer' href={`tel:${student.phone}`}>{student.phone}</a> : `Студент не указал телефон`}</li>
                                <li>{student.email ? <a target='_blank' rel='noreferrer' href={`mailto:${student.email}`}>{student.email}</a> : `Студент не указал почту`}</li>
                                <li>{student.telegram_link ? <a target='_blank' rel='noreferrer' href={`https://t.me/${student.telegram_link}`}>Ссылка</a> : `Студент не указал телеграм`}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="second-content">
                        <img src={student.avatar} alt=""/>
                    </div>
                </div>
                <div className="student-about">
                    <h3>О себе:</h3>
                    <p>{student.about || 'Студент еще не написал о себе'}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailInfo;
