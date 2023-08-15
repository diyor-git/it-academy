import "./Settings.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "../../../redux/reducers/usersReducer";
import { getProfileSelector } from "../../../redux/selectors/usersSelectors";
import Preloader from "../../../landing/components/Preloader/Preloader";
import { Avatar, Input, message, Upload } from "antd";
import defaultAvatar from "../../../assets/icons/defaultAva.svg";
import NumberFormat from "react-number-format";
import { getUserData } from "../../../redux/reducers/authorizationReducer";
import { getLoginData } from "../../../redux/selectors/authorizationSelectors";

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  let profile: any = useAppSelector((state) => getProfileSelector(state));
  let user = useAppSelector((state) => getLoginData(state));
  let [password, setPassword] = useState(null);
  let [phone, setPhone]: any = useState(null);
  let [repeatPassword, setRepeatPassword] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) => {
    data.phone = phone === profile.phone ? null : phone;
    dispatch(updateProfile(data)).then(() => {
      dispatch(getProfile());
      dispatch(getUserData());
      message.success(t("saveProfile"));
    });
  };
  const onSubmitPassword: SubmitHandler<any> = (data) => {
    dispatch(changePassword(data));
  };
  const upload = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file: any) => {
      message.info(`${file.file.name} ${t("photoLoading")}`);
      // @ts-ignore
      dispatch(updateProfile({ avatar: file.file })).then(() => {
        dispatch(getProfile());
        dispatch(getUserData());
        message.success(`${file.file.name} ${t("photoLoaded")}`);
      });
    },
  };

  useEffect(() => {
    dispatch(getProfile()).then((data: any) => {
      setPhone(data.payload.phone);
    });
  }, []);

  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className="settings">
      <h2 className="title">{t("settingsAcc")}</h2>
      <div className="content">
        <h3>{t("aboutSelf")}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="doubleField">
            <div className="field">
              <p>{t("yourName")}:</p>
              {errors.first_name && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                placeholder={t("name")}
                type="text"
                {...register("first_name", { required: true })}
                defaultValue={profile.first_name}
              />
            </div>
            <div className="field">
              <p>{t("yourLastname")}:</p>
              {errors.last_name && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                placeholder={t("lastname")}
                type="text"
                {...register("last_name", { required: true })}
                defaultValue={profile.last_name}
              />
            </div>
            <div className="field">
              <p>{t("yourLogin")}:</p>
              {errors.username && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                placeholder={t("yourLogin")}
                type="text"
                {...register("username", { required: true })}
                defaultValue={profile.username}
              />
            </div>
            <div className="field">
              <p>{t("yourEmail")}:</p>
              {errors.email && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                placeholder={t("yourEmail")}
                type="text"
                {...register("email", { required: true })}
                defaultValue={profile.email}
              />
            </div>
            <div className="field">
              <p>Стэк технологий:</p>
              {errors.stack && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                placeholder={"HTML, CSS, JS, React"}
                type="text"
                {...register("skills", { required: false })}
                defaultValue={profile.skills}
              />
            </div>
            <div className="field">
              <p>{t("yourPhone")}:</p>
              {errors.phone && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <Controller
                name="phone"
                control={control}
                defaultValue={profile.phone || phone}
                rules={{ required: false }}
                render={({ field }) => (
                  <NumberFormat
                    format="+998 ## ###-##-##"
                    mask={"_"}
                    placeholder="90 123-45-67"
                    defaultValue={profile?.phone?.substr(3)}
                    onChange={(e: any) => {
                      field.onChange(e);
                      setPhone(e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="field">
              <p>{t("dob")}:</p>
              {errors.dob && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <Controller
                  name="dob"
                  control={control}
                  defaultValue={profile.dob ? profile.dob : null}
                  rules={{ required: false }}
                  render={({ field }) => (
                      <NumberFormat
                          format="##/##/####"
                          mask={"_"}
                          placeholder="01/10/2021"
                          defaultValue={profile.dob}
                          onChange={(e: any) => {
                            field.onChange(e.target.value);
                          }}
                      />
                  )}
              />
            </div>
            <div className="field">
              <p>Ваш телеграм:</p>
              {errors.telegram_link && (
                  <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <input
                  placeholder={"Ваш username без @"}
                  type="text"
                  {...register("telegram_link", { required: false })}
                  defaultValue={profile.telegram_link}
              />
            </div>
            <div className="field">
              <p>{t("yourGender")}:</p>
              {errors.gender && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <select
                placeholder="Пол"
                defaultValue={profile.gender}
                {...register("gender", { required: false })}
              >
                <option value="man">{t("man")}</option>
                <option value="woman">{t("woman")}</option>
              </select>
            </div>
            <div className="field">
              <p>О себе:</p>
              {errors.about && (
                <span className="error">{t("requiredField")}</span>
              )}
            </div>
            <div className="input">
              <textarea
                placeholder="Расскажите о себе"
                {...register("about", { required: false })}
                defaultValue={profile.about}
              />
            </div>
            <div className="hidden" />
            <div className="changeAva">
              <div className="text">
                <p>{t("changeAva")}</p>
                <Upload {...upload}>
                  <button className="uploadBtn">{t("selectFile")}</button>
                </Upload>
              </div>
              <div className="avatar">
                <Avatar
                  draggable={false}
                  size={100}
                  src={profile.avatar}
                  icon={<img src={defaultAvatar} alt="Avatar" />}
                />
              </div>
            </div>
          </div>
          {!user?.google_user && !user?.telegram_user && (
            <>
              <h3>{t("changePassword")}</h3>
              <div className="doubleField">
                <div className="field">
                  <p>{t("oldPassword")}:</p>
                  {errors.old_password && (
                    <span className="error">{t("requiredField")}</span>
                  )}
                </div>
                <div className="input">
                  <Controller
                    name="old_password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        autoComplete="off"
                        onChange={(e: any) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="field">
                  <p>{t("newPassword")}:</p>
                  {errors.new_password && (
                    <span className="error">{t("requiredField")}</span>
                  )}
                  {password !== repeatPassword && (
                    <span className="error">
                      {t("Authorization:passwordMismatch")}
                    </span>
                  )}
                </div>
                <div className="input">
                  <Controller
                    name="new_password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        onChange={(e: any) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="field">
                  <p>{t("confirmPassword")}:</p>
                  {errors.new_password2 && (
                    <span className="error">{t("requiredField")}</span>
                  )}
                  {password !== repeatPassword && (
                    <span className="error">
                      {t("Authorization:passwordMismatch")}
                    </span>
                  )}
                </div>
                <div className="input">
                  <Controller
                    name="new_password2"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        onChange={(e: any) => {
                          field.onChange(e);
                          setRepeatPassword(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </>
          )}
          <button className="next" type="submit">
            {t("updateData")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
