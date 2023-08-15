import footerImg from "../../../assets/image/footer.png";
import "./ContactForm.scss";
import Button from "../Button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../redux/hooks";
import {sendEmail, SendEmailType,} from "../../../redux/reducers/landingReducer";
import {message, Modal} from "antd";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import Anchor from "../Anchor/Anchor";

const ContactForm = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SendEmailType>();
    const onSubmit: SubmitHandler<SendEmailType> = (data) => {
        dispatch(sendEmail(data))
            .then((res: any) => {
                setIsModalVisible(true);
            })
            .catch((e) => {
                message.error(t("errorContact"));
            });
    };
    return (
        <section className="contactForm">
            <div className="footer-container">
                <Anchor/>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-first__content">
                            <img src={footerImg} alt=""/>
                            <div className="title">
                                <h3>{t('contact')}</h3>
                                <p>{t('contact1')}</p>
                            </div>
                        </div>
                        <div className="footer-second__content">
                            <form onSubmit={handleSubmit(onSubmit)} className="form">
                                <input
                                    type="email"
                                    placeholder="Имя"
                                    {...register("email", {required: true})}
                                />
                                <input
                                    type="text"
                                    placeholder="Телефон"
                                    {...register("phone", {required: true})}
                                />
                                <textarea placeholder={t('comment')} {...register("comment")} />
                                <div>
                                    <Button text={t('send')} color={"orange"}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                width={800}
                className="courseModal"
                visible={isModalVisible}
                footer={""}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="sendForm">
                    <h2 className="title">{t('request')}</h2>
                    <p>{t('request2')}</p>
                    <div
                        onClick={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        <Button text={t('close')} color={"orange"}/>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default ContactForm;
