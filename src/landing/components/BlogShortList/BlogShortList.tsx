import React, {useEffect} from "react";
import "./BlogShortList.scss";
import Button from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getArticlesSelector} from "../../../redux/selectors/usersSelectors";
import {getArticles} from "../../../redux/reducers/usersReducer";
import Preloader from "../Preloader/Preloader";
import {Link} from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BlogShortList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state) => getArticlesSelector(state));

    useEffect(() => {
        dispatch(getArticles());
    }, []);

    if (!articles) {
        return <Preloader/>;
    }

    return (
        <section className="blogShortList">
            <div className="container">
                <h2 className="title">{t('blog')}</h2>
                <div className="cards">
                    {articles.slice(0, 3).map((a, key: number) => {
                        return (
                            <Link key={key} to={`article/${a.pk}`}>
                                <div className="card">
                                    <div className="img">
                                        <img src={a.photo} alt=""/>
                                    </div>
                                    <div className="card-title">
                                        <h4>{a.title && a.title.slice(0, 50)}...</h4>
                                        <h5>{t('publication')} {moment(a.created_at).format('DD.MM.YYYY')}</h5>
                                    </div>
                                    <button className="card-button">{t('detail')}</button>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="blog-button">
                    <Link to="/blog">
                        <Button text={t('seeAll')} color={"violet"}/>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogShortList;
