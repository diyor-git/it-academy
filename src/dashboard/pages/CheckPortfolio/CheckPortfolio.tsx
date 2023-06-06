import "./CheckPortfolio.scss";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getPortfolio,
  patchPortfolio,
  PortfolioType,
} from "../../../redux/reducers/usersReducer";
import { Checkbox, message, Modal, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getPortfolioSelector } from "../../../redux/selectors/usersSelectors";

const CheckPortfolio = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgPartner, setImgPartner] = useState();
  const [imgPartnerFile, setImgPartnerFile] = useState();
  const [stateCard, setStateCard]: any = useState("");
  const [check, setCheck] = useState();
  const portfolio = useAppSelector((state) => getPortfolioSelector(state));
  const [portfolioStatus, setPortfolioStatus] = useState();

  let request: any = {};
  const uploadImgPartner = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file: any) => {
      setImgPartnerFile(file.file);
      let reader: any = new FileReader();
      let url = reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setImgPartner(reader.result);
      };
    },
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setValue("title", "");
    setValue("url", "");
    setValue("skills", "");
    setValue("tag", "");
    setValue("status", false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("title", "");
    setValue("url", "");
    setValue("skills", "");
    setValue("tag", "");
    setValue("status", false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PortfolioType>({
    defaultValues: stateCard,
  });
  function checkedBox(e: any) {
    setCheck(e.target.checked);
  }
  const onSubmit: SubmitHandler<PortfolioType> = (data): any => {
    request = { ...data };
    request.photo = imgPartnerFile;
    request.status = check;
    request.id = data.id;

    dispatch(patchPortfolio(request)).then(() => {
      message.success("Обновлен");
      handleOk();
      dispatch(getPortfolio());
    });
  };
  const modalShow = (el: any) => {
    setValue("photo", el.photo);
    setValue("status", el.status);
    setValue("url", el.url);
    setValue("skills", el.stack);
    setValue("status", el.status);
    setValue("id", el.id);
    setValue("title", el.title);
    setImgPartner(el.photo);
    setPortfolioStatus(el.status);
    setIsModalVisible(true);
  };
  useEffect(() => {
    dispatch(getPortfolio());
  }, []);

  return (
    <div className="checkPortfolio">
      <h2 className="title">Проверить портфолио</h2>
      <p>Проверьте работы, чтобы у них был Статус: Активен</p>
      <div className="cards">
        {!portfolio
          ? ""
          : portfolio.map((el) => {
              return (
                <div key={el.id} onClick={() => modalShow(el)} className="card">
                  <img src={el.photo} alt="" />
                  <a href={el.url}>link{el.url}</a>
                  <p>Name : {el.full_name} </p>
                  <p>title : {el.title} </p>
                  <p>Status : {el.status.toString()} </p>
                </div>
              );
            })}
      </div>
      <Modal
        title="Проверить работу"
        className="modal"
        width={500}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="partnersModal" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <Checkbox
              {...register("status", { required: false })}
              onChange={checkedBox}
              defaultChecked={portfolioStatus}
            >
              Активная работа
            </Checkbox>
          </label>
          <label className="partnerName">
            <p>Название работы:</p>
            <input
              placeholder="Название сайта"
              {...register("title", { required: false })}
            />
          </label>
          <label className="partnerLink">
            <p>Ссылка на работу:</p>
            <input
              placeholder="Ссылка на ваш сайт"
              {...register("url", { required: false })}
            />
          </label>
          <label className="partnerDescription">
            <p>Стек технологий:</p>
            <input
              placeholder="Стек технологий"
              {...register("skills", { required: false })}
            />
          </label>

          <div className="imgLms">
            {imgPartner ? (
              <div className="previewImage">
                <img src={imgPartner} alt="Banner" />
                <div className="changeBanner">
                  <div className="content">
                    <h3>Изменить фото работы</h3>
                    <p>Оптимальные размеры 325 x 185px</p>
                    <Upload className="upload" {...uploadImgPartner}>
                      <input type="button" value="Изменить" className="btn" />
                    </Upload>
                    <button
                      className="btn"
                      onClick={() => {
                        //@ts-ignore
                        setImgPartner("");
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
                  <h3>Установите фото работы</h3>
                  <p>Оптимальные размеры 325 x 185px</p>
                  <Upload {...uploadImgPartner}>
                    <input type="button" value="Изменить" className="btn" />
                  </Upload>
                </div>
              </div>
            )}
          </div>
          <button className="btnSubmit" type="submit">
            Отправить
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckPortfolio;
