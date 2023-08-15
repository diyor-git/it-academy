import "./Direction.scss";
import React, {useState} from "react";
import {message, Modal} from "antd";
import {sendEmail} from "../../../redux/reducers/landingReducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../redux/hooks";
import Button from "../Button/Button";

type DirectionProps = {
    title: string;
    subtitle?: string;
    img: string;
};

const Direction: React.FC<DirectionProps> = ({title, img, subtitle}) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {setIsModalVisible(true);};
    const handleOk = () => {setIsModalVisible(false);};
    const handleCancel = () => {setIsModalVisible(false);};

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<any>();
    const onSubmit: SubmitHandler<any> = (data) => {
        dispatch(sendEmail(data))
            .then((res: any) => {
                setIsModalVisible(true);
            })
            .catch((e) => {
                message.error(t("errorContact"));
            });
    };
    return (
        <section className="direction">
            <div className="card">
                <div className="container">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h2>{title}</h2>
                        <h3>{subtitle}</h3>
                        <div className="send">
                            <input
                                type="email"
                                placeholder="E-mail"
                                {...register("email", {required: true})}
                            />
                            <button>{t('send')}</button>
                        </div>
                    </form>
                    <img src={img} alt="Direction"/>
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
                    <h2 className="title">{t("request")}</h2>
                    <p>{t("request2")}</p>
                    <div
                        onClick={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        <Button text={t("close")} color={"orange"}/>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default Direction;
