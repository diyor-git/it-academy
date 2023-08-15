import './Rating.scss'
import {Avatar, Select, Table} from 'antd'
import {Link, useParams} from 'react-router-dom'
import {useEffect} from "react"
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {getRatingList} from "../../../redux/reducers/usersReducer"
import {getRatingListSelector} from '../../../redux/selectors/usersSelectors'
import defaultAvatar from "../../../assets/icons/defaultAva.svg"
import pointsImg from '../../../assets/icons/points.svg'
import {useTranslation} from "react-i18next";
import {useMediaQuery} from 'react-responsive'

const Rating = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const isTablet = useMediaQuery({query: '(max-width: 991px)'})
    const isMobile = useMediaQuery({query: '(max-width: 575px)'})
    let ratingList = useAppSelector(state => getRatingListSelector(state))
    useEffect(() => {
        dispatch(getRatingList())
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    return (
        <div className='rating'>
            <h2 className='title'>{t("overallRating")}</h2>
            <div className="ratingTable">
                <div className="headerTable">
                    <h2 className="name">{t("name")}</h2>
                    <h2 className="points">{t("points")}</h2>
                    <h2 className="gpa">GPA</h2>
                </div>
                <div className="bodyTable">
                    {ratingList && !isTablet && ratingList.map((r:any, key:any) => <div key={key} className="people">
                        <div className="name">
                            <p className='position'>{r.position}</p>
                            <Avatar draggable={false} size={20}
                                    src={r.avatar}
                                    icon={<img src={defaultAvatar} alt="Avatar"/>}/>
                            <p>{r.full_name}</p>
                        </div>
                        <div className="points">
                            <img src={pointsImg} alt="Points"/>
                            <p>{r.points}</p>
                        </div>
                        <div className="gpa">
                            <img src={pointsImg} alt="Points"/>
                            <p>{r.gpa}</p>
                        </div>
                    </div>)}
                    {ratingList && isTablet && ratingList.map((r:any, key:any) => <div key={key} className="people">
                        <div className="name">
                            <Avatar draggable={false} size={20}
                                    src={r.avatar}
                                    icon={<img src={defaultAvatar} alt="Avatar"/>}/>
                            <p>{r.full_name}</p></div>
                            <p className='position'>Место: {r.position}</p>

                        <div className="points">
                            <p>Баллы: {r.points}</p>
                            <p>GPA: {r.gpa}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Rating