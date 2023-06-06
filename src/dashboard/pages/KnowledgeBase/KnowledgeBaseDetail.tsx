import './KnowledgeBase.scss'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Card from "../../components/Card/Card"
import {SubmitHandler, useForm} from "react-hook-form"
import {message, Modal, Upload} from 'antd'
import plus from '../../../assets/image/plus.png'
import {
    createBaseBook,
    createBaseVideo,
    getKnowledgeBaseDetail,
    KnowledgeBaseBookDetailType,
    KnowledgeBaseVideoDetailType
} from "../../../redux/reducers/usersReducer";
import {getKnowledgeBaseDetailSelector} from "../../../redux/selectors/usersSelectors";
import {useTranslation} from 'react-i18next'
import {getPermission} from "../../../redux/selectors/authorizationSelectors";
import Preloader from "../../../landing/components/Preloader/Preloader";

const KnowledgeBaseDetail = () => {
    const {t} = useTranslation()
    let params: any = useParams()
    const dispatch = useAppDispatch()
    let base = useAppSelector(state => getKnowledgeBaseDetailSelector(state))
    const permission = useAppSelector(state => getPermission(state))
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [typeCategory, setTypeCategory] = useState()
    let [imgLms, setImgLms] = useState()
    let [imgLmsFile, setImgLmsFile] = useState()
    let request: any = {}
    const uploadImgLms = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgLmsFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgLms(reader.result)
            }
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const {register, handleSubmit, formState: {errors}} = useForm<any>();
    const onSubmit: SubmitHandler<any> = (data): any => {
        request = {...data}
        request.preview = imgLmsFile
        request.kn_base = params.id
        if (typeCategory === 0) {
            dispatch(createBaseVideo(request)).then(() => {
                dispatch(getKnowledgeBaseDetail(params.id))
                message.success('Видео добавлено')
                setIsModalVisible(false)
            })
        } else {
            dispatch(createBaseBook(request)).then(() => {
                dispatch(getKnowledgeBaseDetail(params.id))
                message.success('Книга добавлена')
                setIsModalVisible(false)
            })
        }
    }
    useEffect(() => {
        dispatch(getKnowledgeBaseDetail(params.id)).then((data: any) => {
            setTypeCategory(data.payload.category)
        })
    }, [])
    if (!base) {
        return <Preloader/>
    }
    return (
        <div className='createCourse'>
            <h2 className='title'>{base.title}</h2>
            <div className={typeCategory === 0 ? "courseGrid" : "courseGridBook"}>
                {typeCategory === 0 ? base.videos && base.videos.map((c:KnowledgeBaseVideoDetailType, key: number) =>
                    <a rel='noreferrer' key={key} href={c.video} target='_blank'>
                        <Card img={c.preview} title={c.title}/>
                    </a>) : base.books && base.books.map((c: KnowledgeBaseBookDetailType, key: number) =>
                    <a rel='noreferrer' key={key} href={c.book} target='_blank'>
                        <div className="bookCard">
                            <div className="image">
                                <img src={c.preview} alt="Book"/>
                            </div>
                            <p>{c.title}</p>
                        </div>
                    </a>)}
                {permission === 'Admin' &&
                <div onClick={showModal} className='newCourse'>
                    <img src={plus} alt="Create Content"/>
                </div>}
            </div>
            <Modal title={typeCategory === 0 ? 'Добавить видео' : 'Добавить книгу'} className='modal' width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form className='formCourse' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>{typeCategory === 0 ? 'Название видео:' : 'Название книги:'}</p>
                        <input placeholder='JavaScript в примерах и задачах' {...register("title", {required: true})} />
                        {errors.title && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label>
                        <p>{typeCategory === 0 ? 'Ссылка на видео:' : 'Ссылка на книгу:'}</p>
                        {typeCategory === 0 ?
                            <><input placeholder='Ссылка' {...register('video', {required: typeCategory === 0})} />
                                {errors.video && <span className='error'>{t("requiredField")}</span>}</> :
                            <><input placeholder='Ссылка' {...register('book', {required: typeCategory === 1})} />
                                {errors.book && <span className='error'>{t("requiredField")}</span>}</>
                        }
                    </label>
                    <div className="preview">
                        {imgLms ? <div className='previewImage'><img src={imgLms} alt="Banner"/>
                            <div className='changeBanner'>
                                <div className="content">
                                    <h3>Изменить превью {typeCategory === 0 ? 'видео' : 'книги'}</h3>
                                    <p>Оптимальные размеры 325 x 185px</p>
                                    <Upload className='upload' {...uploadImgLms}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                    <button className='btn' onClick={() => {
                                        //@ts-ignore
                                        setImgLms('')
                                    }}>Удалить
                                    </button>
                                </div>
                            </div>
                        </div> : <div className='installImg'>
                            <div className="content">
                                <h3>Установите превью {typeCategory === 0 ? 'видео' : 'книги'}</h3>
                                <p>Оптимальные размеры 325 x 185px</p>
                                <Upload {...uploadImgLms}>
                                    <input type='button' value='Изменить' className='btn'/>
                                </Upload>
                            </div>
                        </div>}
                    </div>
                    <button className='btnSubmit' type='submit'>Отправить</button>
                </form>
            </Modal>
        </div>
    )
}
export default KnowledgeBaseDetail