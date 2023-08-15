import Header from "../../components/Header/Header";
import "./Blog.scss";
import ContactForm from "../../components/ContactForm/ContactForm";
import {getArticlesSelector, getMemesSelector} from "../../../redux/selectors/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Preloader from "../../components/Preloader/Preloader";
import React, {useEffect} from "react";
import {getArticles, getMemes} from "../../../redux/reducers/usersReducer";
import moment from "moment";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

const Blog = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const articles = useAppSelector(state => getArticlesSelector(state))
    const memes = useAppSelector(state => getMemesSelector(state))


    useEffect(() => {
        dispatch(getArticles())
        dispatch(getMemes())
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])

    if (!articles && !memes) {
        return <Preloader/>
    }
    return (
        <div className="blog">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY | Blog`}</title>
            </Helmet>
            <Header theme="black"/>
            <div className="blog-container">
                <div className="content">
                    <div className="first-content">
                        <h2 className="title">{t('last')}</h2>
                        <div className="cards">
                            {articles.map((a, key: number) =>
                                <Link to={`/article/${a.pk}`}>
                                    <div key={key} className="card">
                                        <div className="img">
                                            <img src={a.photo} alt="Article"/>
                                        </div>
                                        <div className="text">
                                            {a.tag && <button>{a.tag}</button>}
                                            <h5>{a.title}</h5>
                                            <p>{a.description && a.description.slice(0, 70)}...</p>
                                            <h6>{t('publication')} {moment(a.created_at).format('DD.MM.YYYY')}</h6>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="side-bar">
                        <nav>
                            <h4>{t('memes')}</h4>
                            {memes.map((m, key: number) =>
                                <Link to={`/memes`}>
                                    <div key={key} className="memes">
                                        <h5>{m.title}</h5>
                                        <img src={m.meme} alt="Meme"/>
                                        <h6>{t('publication')} {moment(m.created_at).format('DD.MM.YYYY')}</h6>
                                    </div>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
            <ContactForm/>
        </div>
    );
};

export default Blog;
