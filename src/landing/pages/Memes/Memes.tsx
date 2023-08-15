import "./Memes.scss";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {getMemesSelector} from "../../../redux/selectors/usersSelectors";
import {clearArticleDetail, getMemes} from "../../../redux/reducers/usersReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Preloader from "../../components/Preloader/Preloader";
import Header from "../../components/Header/Header";
import ContactForm from "../../components/ContactForm/ContactForm";
import moment from "moment";
import {useTranslation} from "react-i18next";
import FooterAcademy from "../../components/FooterAcademy/FooterAcademy";


const Memes = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const params: any = useParams();
    const memes = useAppSelector(state => getMemesSelector(state))

    useEffect(() => {
        dispatch(getMemes())
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        return () => {
            dispatch(clearArticleDetail());
        };
    }, [params.id]);

    if (!memes) return <Preloader/>;

    return (
        <article className="memes">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY | Memes`}</title>
            </Helmet>
            <Header theme="black"/>
            <div className="container">
                <div className="memesContainer">
                    <h2 className="title">{t('memes')}</h2>
                    {memes.map((m, key: number) =>
                        <div key={key} className='meme'>
                            <p>{t('publication')} {moment(m.created_at).format('DD.MM.YYYY')}</p>
                            <img src={m.meme} alt="Meme"/>
                        </div>
                    )}
                </div>
            </div>
            <ContactForm/>
            <FooterAcademy/>
        </article>
    );
};
export default Memes;
