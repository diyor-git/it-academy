import "./ArticleDetail.scss";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import React, {useEffect, useRef} from "react";
import {clearArticleDetail, getArticleDetail,} from "../../../../redux/reducers/usersReducer";
import {getArticleDetailSelector} from "../../../../redux/selectors/usersSelectors";
import Preloader from "../../../components/Preloader/Preloader";
import Header from "../../../components/Header/Header";
import EditorJs from "react-editor-js";
import {EDITOR_JS_TOOLS} from "../../../../redux/selectors/constants";
import ContactForm from "../../../components/ContactForm/ContactForm";
import MoreArticles from "../../../components/MoreArticles/MoreArticles";
import {Helmet} from "react-helmet";

const ArticleDetail = () => {
    const dispatch = useAppDispatch();
    const params: any = useParams();
    const article = useAppSelector((state) => getArticleDetailSelector(state));
    const instanceRef: any = useRef(null);
    useEffect(() => {
        dispatch(getArticleDetail(params.id));
        return () => {
            dispatch(clearArticleDetail());
        };
    }, [params.id]);

    if (!article) return <Preloader/>;

    return (
        <article className="article">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`IT-ACADEMY | ${article.title}`}</title>
            </Helmet>
            <Header theme="black"/>
            <div className="container">
                <div className="headerArticle">
                    <h1 className="title">{article.title}</h1>
                    <img src={article.photo} alt="Article"/>
                </div>
                <div className="contentArticle">
                    <EditorJs
                        readOnly={true}
                        tools={EDITOR_JS_TOOLS}
                        //@ts-ignore
                        data={article.content}
                        instanceRef={(instance) => (instanceRef.current = instance)}
                    />
                </div>
                <MoreArticles/>
            </div>
            <ContactForm/>
        </article>
    );
};
export default ArticleDetail;
