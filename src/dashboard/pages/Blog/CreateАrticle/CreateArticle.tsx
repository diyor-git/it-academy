import "./CreateАrticle.scss";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import plus from "../../../../assets/image/plus.png";
import {getArticles, getMemes, postMem,} from "../../../../redux/reducers/usersReducer";
import {getArticlesSelector, getMemesSelector,} from "../../../../redux/selectors/usersSelectors";
import {useTranslation} from "react-i18next";
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {message, Modal, Upload} from "antd";
import {useForm} from "react-hook-form";

const CreateArticle = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const articles = useAppSelector((state) => getArticlesSelector(state));
    const permission = useAppSelector((state) => getPermission(state));
    const memes = useAppSelector((state) => getMemesSelector(state));

    useEffect(() => {
        dispatch(getArticles());
        dispatch(getMemes());
    }, []);
    const [stateCard, setStateCard] = useState<any>("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: stateCard,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [siteImg, setSiteImg] = useState();
    const [siteImgFile, setSiteImgFile] = useState();

    let request: any = {};

    const uploadImgPartner = {
        accept: ".png, .jpg, .jpeg",
        showUploadList: false,
        name: "file",
        multiple: false,
        customRequest: (file: any) => {
            setSiteImgFile(file.file);
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setSiteImg(reader.result);
            };
        },
    };

    const onSubmit = (data: any) => {
        request = {...data};
        request.mem = siteImgFile;
        dispatch(postMem(request)).then(() => {
            message.success("Мем добавлен");
            dispatch(getMemes());
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setValue("title", "");
        setValue("description", "");
        setValue("link", "");
    };

    //Protection to prevent certain roles from accessing the page
    if (
        permission === "User" ||
        permission === "Student" ||
        permission === "Mentor"
    ) {
        navigate("/dashboard/");
    }
    if (!articles) {
        return <Preloader/>;
    }
    return (
        <div className="createArticles">
            <h2 className="title">Создать статью</h2>
            <div className="articlesGrid">
                {articles.map((a, key: number) => (
                    <div key={key} className="cardLms">
                        <Link to={``}>
                            <div className="image">
                                <img src={a.photo} alt="Banner"/>
                            </div>
                        </Link>
                        <div className="description">
                            <h3>{a.title}</h3>
                        </div>
                    </div>
                ))}
                <div
                    onClick={() => {
                        navigate(`/dashboard/createArticleDetail`);
                    }}
                    className="newCourse"
                >
                    <img src={plus} alt="Create Course"/>
                </div>
            </div>
            <hr/>
            <h2 className="title">Создать мемы</h2>
            <div className="memesGrid">
                {memes.map((m, key: number) => (
                    <div key={key} className="cardLms">
                        <Link to={``}>
                            <div className="image">
                                <img src={m.meme} alt="Banner"/>
                            </div>
                        </Link>
                        <div className="description">
                            <h3>{m.title}</h3>
                        </div>
                    </div>
                ))}
                <div onClick={() => setIsModalVisible(true)} className="newCourse">
                    <img src={plus} alt="Create Course"/>
                </div>
            </div>
            <Modal
                title="Создать мем"
                className="modal"
                width={500}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <form className="partnersModal" onSubmit={handleSubmit(onSubmit)}>
                    <label className="partnerName">
                        <p>Название мема:</p>
                        <input
                            placeholder="Мем"
                            {...register("title", {required: false})}
                        />
                    </label>
                    <label className="partnerDescription">
                        <p>Описание мема:</p>
                        <textarea
                            placeholder="Описание"
                            {...register("description", {required: false})}
                        />
                    </label>
                    <div className="imgLms">
                        {siteImg ? (
                            <div className="previewImage">
                                <img src={siteImg} alt="Banner"/>
                                <div className="changeBanner">
                                    <div className="content">
                                        <h3>Изменить фото мема</h3>
                                        <p>Оптимальные размеры 325 x 185px</p>
                                        <Upload className="upload" {...uploadImgPartner}>
                                            <input type="button" value="Изменить" className="btn"/>
                                        </Upload>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                //@ts-ignore
                                                setSiteImg("");
                                            }}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="installImg">
                                <div className="content">
                                    <h3>Установите фото мема</h3>
                                    <p>Оптимальные размеры 325 x 185px</p>
                                    <Upload {...uploadImgPartner}>
                                        <input type="button" value="Изменить" className="btn"/>
                                    </Upload>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="btnSubmit" type="submit">Отправить</button>
                </form>
            </Modal>
        </div>
    );
};
export default CreateArticle;
