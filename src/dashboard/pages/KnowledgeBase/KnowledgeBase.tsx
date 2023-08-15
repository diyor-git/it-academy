import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import {Link} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Card from "../../components/Card/Card"
import {SubmitHandler, useForm} from "react-hook-form"
import {message, Modal, Switch, Upload} from 'antd'
import plus from '../../../assets/image/plus.png'
import {createKnowledgeBase, getKnowledgeBaseList} from "../../../redux/reducers/usersReducer";
import {getKnowledgeBaseListSelector} from "../../../redux/selectors/usersSelectors";
import {useTranslation} from 'react-i18next'
import {getPermission} from "../../../redux/selectors/authorizationSelectors"

const KnowledgeBase = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    let base = useAppSelector(state => getKnowledgeBaseListSelector(state))
    const permission = useAppSelector(state => getPermission(state))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeCategory, setTypeCategory] = useState(0)
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
    let switchHandler = (e: any) => {
        e ? setTypeCategory(1) : setTypeCategory(0)
    }
    const {register, handleSubmit, control, formState: {errors}} = useForm<any>();
    const onSubmit: SubmitHandler<any> = (data): any => {
        request = {...data}
        request.preview = imgLmsFile
        request.category = typeCategory
        dispatch(createKnowledgeBase(request)).then(() => {
            dispatch(getKnowledgeBaseList())
            message.success(t("courseCreated"))
            setIsModalVisible(false)
        })
    }
    useEffect(() => {
        dispatch(getKnowledgeBaseList())
    }, [])

    return (
        <div className='knowledgeBase'>
            <h2 className='title'>{t("Sidebar:knowledgeBase")}</h2>
            <div className="courseGrid">
                {base ? base.map((c, key: number) =>
                        <Link key={key} to={`/dashboard/knowledgeBase/${c.id}`}>
                            <Card img={c.preview} category={c.category} title={c.title}/>
                        </Link>)
                    : <div>{t("noCourses")}</div>}
                {permission === 'Admin' &&
                <div onClick={showModal} className='newCourse'>
                    <img src={plus} alt="Create Course"/>
                </div>
                }
            </div>

            <Modal title='Создать категорию' className='modal' width={1000} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <form className='formCourse' onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>Название категории:</p>
                        <input placeholder='Frontend' {...register("title", {required: true})} />
                        {errors.title && <span className='error'>{t("requiredField")}</span>}
                    </label>
                    <label>
                        <p>Тип категории:</p>
                        <Switch checkedChildren="Книги" unCheckedChildren="Видео"
                                checked={typeCategory === 1 && true} onChange={(e) => {
                            switchHandler(e)
                        }}/>
                    </label>
                    <div className="preview">
                        {imgLms ? <div className='previewImage'><img src={imgLms} alt="Banner"/>
                            <div className='changeBanner'>
                                <div className="content">
                                    <h3>Изменить превью категории</h3>
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
                                <h3>Установите превью категории</h3>
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
export default KnowledgeBase