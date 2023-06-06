import "./CreatePartners.scss";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {message, Modal, Upload} from "antd";
import plus from "../../../assets/image/plus.png";
import {getPartners, PartnersType, postPartners,} from "../../../redux/reducers/usersReducer";
import {getPartnersSelector} from "../../../redux/selectors/usersSelectors";
import {useTranslation} from "react-i18next";

const CreateArticle = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => getPartnersSelector(state));
  const [stateCard, setStateCard]: any = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgPartner, setImgPartner] = useState();
  const [imgPartnerFile, setImgPartnerFile] = useState();
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
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setValue("title", "");
    setValue("description", "");
    setValue("link", "");
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PartnersType>({
    defaultValues: stateCard,
  });
  const onSubmit: SubmitHandler<PartnersType> = (data): any => {
    request = { ...data };
    request.photo = imgPartnerFile;
    dispatch(postPartners(request)).then(() => {
      dispatch(getPartners());
      message.success("Партнер добавлен");
      setIsModalVisible(false);
    });
  };
  useEffect(() => {
    dispatch(getPartners());
  }, []);

  useEffect(() => {
    setValue("title", stateCard.title);
    setImgPartner(stateCard.photo);
  }, [stateCard]);

  //Protection to prevent certain roles from accessing the page
//   if (
//     permission === "User" ||
//     permission === "Student" ||
//     permission === "Manager"
//   ) {
//     navigate("/dashboard/");
//   }
  return (
    <div className="createPartners">
      <h2 className="title">Создать партнера</h2>
      <div className="partnersGrid">
        {partners ? (
          partners.map((p, key: number) => (
            <div key={key} className="partner">
              <img src={p.photo} alt="Partner" />
            </div>
          ))
        ) : (
          <div>{t("noCourses")}</div>
        )}
        <div
          onClick={() => {
            setStateCard("");
            showModal();
          }}
          className="newCourse"
        >
          <img src={plus} alt="Create Course" />
        </div>
      </div>
      <Modal
        title="Создать партнера"
        className="modal"
        width={500}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="partnersModal" onSubmit={handleSubmit(onSubmit)}>
          <label className="partnerName">
            <p>Название партнера:</p>
            <input
              placeholder="IT-PARK"
              {...register("title", { required: false })}
            />
          </label>
          <label className="partnerLink">
            <p>Ссылка на партнера:</p>
            <input
              placeholder="https://"
              {...register("link", { required: false })}
            />
          </label>
          <label className="partnerDescription">
            <p>Описание партнера:</p>
            <textarea
              placeholder="Описание"
              {...register("description", { required: false })}
            />
          </label>
          <div className="imgLms">
            {imgPartner ? (
              <div className="previewImage">
                <img src={imgPartner} alt="Banner" />
                <div className="changeBanner">
                  <div className="content">
                    <h3>Изменить фото партнера</h3>
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
                  <h3>Установите фото партнера</h3>
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
export default CreateArticle;
