import {Progress} from 'antd'
import {useTranslation} from 'react-i18next';
import bookIcon from '../../../assets/icons/bookIcon.svg'
import videoIcon from '../../../assets/icons/videoIcon.svg'
import './Card.scss'
import blockedImg from "../../../assets/icons/blocked_white.svg";
import React from "react";


const Card = ({img, title, progress, current, total, active, category, settings, blocked}: any) => {
    const {t} = useTranslation();
    return (
        <div className='cardLms'>
            <div className="image">
                <img src={img} alt="Banner"/>
                {blocked && <div className='blocked'>
                    <img src={blockedImg} alt="Blocked"/>
                </div>}
            </div>
            <div className="description">
                <h3>{title}</h3>
                {current != null && <div>
                    <Progress strokeWidth={4} percent={progress} showInfo={false}/>
                    <p>{t("completed")} {progress}% ({current} {t("lessonFrom")} {total})</p>
                    {blocked && <p className='error'>Ваша подписка истекла</p>}
                </div>}
                {/*Categories are only in the Knowledge Base*/}
                {category != null && <div>
                    {category === 'Books' ?
                        <p className='category'><img src={bookIcon} alt="Book"/>{t("books")}</p> :
                        <p className='category'><img src={videoIcon} alt="Video"/>{t("video")}</p>
                    }
                </div>}
                {/*Status occurs only in Create Course*/}
                {active != null &&
                <div className='status'><p>{t("status")}:
                    {active && <span className='active'>{t("active")}</span>}
                    {!active && <span className='notActive'>{t("notActive")}</span>}</p>
                    {settings && <span className='status'>
                        <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M16 0C17.1046 0 18 0.895431 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2C14 0.895431 14.8954 0 16 0ZM9 0C10.1046 0 11 0.895431 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.895431 7.89543 0 9 0ZM4 2C4 0.895431 3.10457 0 2 0C0.895432 0 0 0.895431 0 2C0 3.10457 0.895432 4 2 4C3.10457 4 4 3.10457 4 2Z"
                      fill="black"/>
            </svg>
                    </span>}
                </div>}
            </div>
        </div>
    )
}

export default Card