import "./CreateArticleDetail.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IntroType } from "../../../../redux/reducers/coursesReducer";
import { message, Upload } from "antd";
import { getSelectedChapterSelector } from "../../../../redux/selectors/coursesSelectors";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../../../redux/selectors/constants";
import { postArticles } from "../../../../redux/reducers/usersReducer";

const CreateArticleDetail = () => {
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const navigate = useNavigate();
  let request: any = {};
  let savedData: any;
  const [imgIntro, setImgIntro] = useState();
  const [imgIntroFile, setImgIntroFile] = useState();
  const selectedChapters = useAppSelector((state) =>
    getSelectedChapterSelector(state)
  );
  const uploadImgIntro = {
    accept: ".png, .jpg, .jpeg",
    showUploadList: false,
    name: "file",
    multiple: false,
    customRequest: (file: any) => {
      setImgIntroFile(file.file);
      let reader: any = new FileReader();
      let url = reader.readAsDataURL(file.file);
      reader.onloadend = () => {
        setImgIntro(reader.result);
      };
    },
  };

  const instanceRef: any = useRef(null);
  let handleSaveArticle = async () => {
    savedData = await instanceRef.current.save();
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>({});
  const onSubmitIntro: SubmitHandler<IntroType> = (data): any => {
    request = { ...data };
    request.photo = imgIntroFile;
    dispatch(postArticles(request)).then(() => {
      message.success("Статья успешна создана");
    });
  };

  return (
    <div className="createArticlesDetail">
      <form
        id="formTheory"
        className="formTheory"
        onSubmit={handleSubmit(onSubmitIntro)}
      >
        <label className="contentTitleArticle">
          <TextareaAutosize
            placeholder="Название статьи"
            className={errors.title && "errorInput"}
            {...register("title", { required: true })}
          />
          <input
            placeholder="Тэг например: Жизнь"
            {...register("tag", { required: false })}
            type="text"
          />
          <TextareaAutosize
              placeholder="Описание"
              className={errors.title && "errorInput"}
              {...register("description", { required: false })}
          />
        </label>
        <div className="imgIntro">
          {imgIntro || selectedChapters.image ? (
            <div className="previewImage">
              <img src={imgIntro || selectedChapters.image} alt="Banner" />
              <div className="changeBanner">
                <div className="content">
                  <h3>Изменить баннер статьи</h3>
                  <p>Оптимальные размеры 1150 x 275px</p>
                  <Upload className="upload" {...uploadImgIntro}>
                    <input type="button" value="Изменить" className="btn" />
                  </Upload>
                  <button
                    className="btn"
                    onClick={() => {
                      //@ts-ignore
                      setImgIntro("");
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
                <h3>Установите баннер интро</h3>
                <p>Оптимальные размеры 1150 x 275px</p>
                <Upload {...uploadImgIntro}>
                  <input type="button" value="Изменить" className="btn" />
                </Upload>
              </div>
            </div>
          )}
        </div>
        <EditorJs
          holder="articleText"
          readOnly={false}
          tools={EDITOR_JS_TOOLS}
          data={selectedChapters.text}
          instanceRef={(instance) => (instanceRef.current = instance)}
        >
          <div id="articleText" />
        </EditorJs>
        <button
          className="next"
          type="submit"
          form="formTheory"
          onClick={() => {
            handleSaveArticle().then(() => {
              setValue("content", savedData && savedData);
            });
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};
export default CreateArticleDetail;
