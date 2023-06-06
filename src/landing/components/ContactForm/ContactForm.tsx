import footerImg from "../../../assets/image/footer.png";
import "./ContactForm.scss";
import Button from "../Button/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import {
  sendEmail,
  SendEmailType,
} from "../../../redux/reducers/landingReducer";
import { message, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Anchor from "../Anchor/Anchor";

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
    control,
    reset,
    formState: { errors },
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
        <Anchor />
        <div className="container">
          <div className="footer-content">
            <div className="footer-first__content">
              <img src={footerImg} alt="" />
              <div className="title">
                <h3>Поможем в выборе!</h3>
                <p>
                  Если у вас есть вопросы о формате или вы не знаете, что
                  выбрать, оставтье свой номер - мы позвоим, чтобы ответить на
                  все ваши вопросы.
                </p>
              </div>
            </div>
            <div className="footer-second__content">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Телефон"
                  {...register("phone", { required: true })}
                />
                <textarea placeholder="Комментарий" {...register("comment")} />
                <div>
                  <Button text={"Отправить"} color={"orange"} />
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
          <h2 className="title">Спасибо за заявку</h2>
          <p>Мы свяжемся с вами в ближайшее время.</p>
          <div
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            <Button text={"Закрыть"} color={"orange"} />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ContactForm;
