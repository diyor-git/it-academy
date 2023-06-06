import './CreateTests.scss'
import EditorJs from 'react-editor-js';
import TextareaAutosize from 'react-textarea-autosize';
import {
    createTestsChapter,
    createTestsIntro,
    getTestsDetail,
    IntroType,
    setSelectedChapter,
    updateTestsChapter,
    updateTestsIntro
} from "../../../../redux/reducers/coursesReducer";
import {isSidebar} from "../../../../redux/reducers/authorizationReducer";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getSelectedChapterSelector, getTestsDetailSelector,} from "../../../../redux/selectors/coursesSelectors";
import {message, Select, Upload} from 'antd';
import {SubmitHandler, useForm} from 'react-hook-form';
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {EDITOR_JS_TOOLS} from "../../../../redux/selectors/constants";
import Timer from 'react-compound-timer';
import {getPermission} from '../../../../redux/selectors/authorizationSelectors';
import trash from '../../../../assets/icons/trash.svg'


const {Option} = Select;

const CreateTests = () => {
    const dispatch = useAppDispatch()
    let params: any = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    let testsDetail = useAppSelector(state => getTestsDetailSelector(state))
    let selectedChapters = useAppSelector(state => getSelectedChapterSelector(state))
    let [imgIntro, setImgIntro] = useState()
    let [imgIntroFile, setImgIntroFile] = useState(null)
    let [options, setOptions]: any = useState(selectedChapters.all_variants || [])
    let [optionsType, setOptionsType] = useState(0)
    //let [shortAnswer, setShortAnswer] = useState(selectedChapters.short_answer || [])
    let request: any = {}
    let savedData: any
    let feedbackTrueData: any
    let feedbackFalseData: any


    function handleChangeSelect(value: any) {
        setOptionsType(value)
    }

    const uploadImgIntro = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgIntroFile(file.file)
            let reader: any = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                setImgIntro(reader.result)
            }
        }
    }
    const instanceRef: any = useRef(null)
    const instanceRefCorrect: any = useRef(null)
    const instanceRefNoCorrect: any = useRef(null)
    let handleSave = async () => {
        savedData = await instanceRef.current.save()
        if (selectedChapters.type === 'Test Chapter') {
            feedbackTrueData = await instanceRefCorrect.current.save()
            feedbackFalseData = await instanceRefNoCorrect.current.save()
        }
    }

    let handleClear = () => {
        instanceRef.current.clear()
        selectedChapters.feedback_true &&
        instanceRefNoCorrect.current.clear()
        selectedChapters.feedback_false &&
        instanceRefCorrect.current.clear()
    }
    let handleRender = () => {
        selectedChapters.text &&
        instanceRef.current.render(selectedChapters.text)
        selectedChapters.feedback_true &&
        instanceRefCorrect.current.isReady.then(() => {
            instanceRefCorrect.current.render(selectedChapters.feedback_true)
        })
        selectedChapters.feedback_false &&
        instanceRefNoCorrect.current.isReady.then(() => {
            instanceRefNoCorrect.current.render(selectedChapters.feedback_false)
        })
    }

    const {register, handleSubmit, setValue, control, formState: {errors}} = useForm<any>({});
    const onSubmitIntro: SubmitHandler<IntroType> = (data: any) => {
        request = {...data}
        request.test = params.id
        request.image = imgIntroFile
        request.id = selectedChapters.id
        data.question ? request.question = data.question : delete request.question
        //shortAnswer.length > 0 ? request.short_answer = shortAnswer : delete request.short_answer
        selectedChapters.type !== 'Test Intro' ? (request.type = optionsType) : delete request.type
        request.variants = options
        if (!testsDetail.intro && selectedChapters.type === 'Test Intro') {
            dispatch(createTestsIntro(request)).then(() => {
                dispatch(getTestsDetail(params.id))
                //setValue("greetings", '')
                setValue("title", '')
                message.success('Интро успешно создано')
            })
        } else if (selectedChapters.title && selectedChapters.type === 'Test Intro') {
            dispatch(updateTestsIntro(request)).then((res) => {
                console.log(res)
                message.success('Интро успешно обновлено')
                dispatch(setSelectedChapter(res.payload))
                dispatch(getTestsDetail(params.id))
                //setValue("title", '')
            })
        } else if (!selectedChapters.title && selectedChapters.type === 'Test Chapter') {
            dispatch(createTestsChapter(request)).then(() => {
                message.success('Вопрос успешно создан')
                dispatch(getTestsDetail(params.id))
                //setValue("greetings", '')
                setValue("question", '')
                setValue("title", '')
                setOptions([])
            })
        } else if (selectedChapters.title && selectedChapters.type === 'Test Chapter') {
            dispatch(updateTestsChapter(request)).then((res) => {
                message.success('Вопрос успешно обновлен')
                dispatch(setSelectedChapter(res.payload))
                dispatch(getTestsDetail(params.id))
            })
        }
    }

    let handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            let updatedList: any = [...options, {variant: event.target.value, answer: false}]
            setOptions(updatedList)
            console.log(updatedList)
            event.target.value = ''
        }
    }
    useEffect(() => {
        dispatch(getTestsDetail(params.id)).then((data: any) => {
            dispatch(isSidebar('testsSidebar'))
            if (!data.payload.intro) {
                dispatch(setSelectedChapter({type: 'Test Intro'}))
            } else {
                dispatch(setSelectedChapter(data.payload.intro))
            }
        })
    }, [])
    useEffect(() => {
        if (selectedChapters.render) {
            handleRender()
        }
        if (selectedChapters.clear) {
            handleClear()
        }
        setOptions(selectedChapters.all_variants || [])
        setValue("title", selectedChapters.title)
        setValue("greetings", selectedChapters.greetings)
        setValue("question", selectedChapters.question)
        //@ts-ignore
        setImgIntro('')
    }, [selectedChapters])
    useEffect((): any => {
        return () => {
            dispatch(setSelectedChapter(''))
            dispatch(isSidebar('studentSidebar'))
        }
    }, [])

    useEffect(() => {
        console.log('Option Изменились!')
        console.log(options)
    }, [options])
    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student' || permission === 'Manager') {
        navigate('/dashboard/')
    }

    if (!selectedChapters.type) {
        return <Preloader/>
    }
    return (
        <div className='createTests'>
            <div className="intro">
                <div className="imgIntro">
                    {imgIntro || selectedChapters.image ?
                        <div className='previewImage'><img src={imgIntro || selectedChapters.image} alt="Banner"/>
                            <div className='changeBanner'>
                                <div className="content">
                                    <h3>Изменить баннер интро</h3>
                                    <p>Оптимальные размеры 1150 x 275px</p>
                                    <Upload className='upload' {...uploadImgIntro}>
                                        <input type='button' value='Изменить' className='btn'/>
                                    </Upload>
                                    <button className='btn' onClick={() => {
                                        //@ts-ignore
                                        setImgIntro('')
                                    }}>Удалить
                                    </button>
                                </div>
                            </div>
                        </div> : <div className='installImg'>
                            <div className="content">
                                <h3>Установите баннер интро</h3>
                                <p>Оптимальные размеры 1150 x 275px</p>
                                <Upload {...uploadImgIntro}>
                                    <input type='button' value='Изменить' className='btn'/>
                                </Upload>
                            </div>
                        </div>}
                </div>
                {/*Надо сделать одну форму hook-form, и потом поправить position absolute у input*/}
                <form id="hook-form" onSubmit={handleSubmit(onSubmitIntro)}>
                    <label className='introTitle'>
                        <input placeholder='Введение: Computer Science'
                               className={errors.title && 'errorInput'} {...register("title", {required: true})} />
                    </label>
                </form>
            </div>
            <form id="hook-form" onSubmit={handleSubmit(onSubmitIntro)}>
                <label className='contentTitle'>
                    {selectedChapters.type === 'Test Intro' &&
                    <TextareaAutosize placeholder='Приветствие'
                                      className={errors.greetings && 'errorInput'}
                                      defaultValue={selectedChapters.greetings}
                                      {...register("greetings", {required: true})}/>}
                    {selectedChapters.type === 'Test Chapter' &&
                    <TextareaAutosize placeholder='Вопрос'
                                      className={errors.question && 'errorInput'}
                                      {...register("question", {required: true})}/>}

                </label>
                <div className="questionsAndTimer">
                    <p>{testsDetail.chapters ? `${testsDetail.chapters.length} вопросов` : 'Нету вопросов'} </p>
                    <span/>
                    {testsDetail.timer ?
                        <Timer
                            initialTime={testsDetail.timer * 1000}
                            startImmediately={false}
                        >
                            {() => (
                                <div className='timer'>
                                    <p><Timer.Minutes/>:<Timer.Seconds/></p>
                                </div>
                            )}
                        </Timer> : <p>Бессрочно</p>}
                </div>
                {/*See editorjs.io and www.npmjs.com/package/react-editor-js for details*/}
                <EditorJs
                    holder='text'
                    readOnly={false}
                    tools={EDITOR_JS_TOOLS}
                    data={selectedChapters.text}
                    instanceRef={(instance) => (instanceRef.current = instance)}
                >
                    <div id='text'/>
                </EditorJs>
                {selectedChapters.type === 'Test Chapter' &&
                <div className='options'>
                    <div className="selectOptions">
                        <p>Тип вопроса:</p>
                        <Select defaultValue={0} onChange={handleChangeSelect}>
                            <Option value={0}>Выбор одного ответа</Option>
                            {/*<Option value={1}>Выбор нескольких ответов</Option>*/}
                            {/*<Option value={2}>Свободный ввод</Option>*/}
                        </Select>
                    </div>
                    {optionsType === 0 &&
                    <div className='singleOptions'>
                        {options.map((o: any, key: any) =>
                            <div key={key} className="option">
                                <input name='single' checked={o.answer || undefined} onChange={(e) => {
                                    console.log(options)
                                    let selected = (options.map((o: any) => {
                                        return {variant: o.variant, answer: false}
                                    }))
                                    selected[key] = {variant: e.target.value, answer: e.target.checked}
                                    setOptions(selected)
                                }} id={key} type="radio" value={o.variant}/>
                                <label htmlFor={key}>{o.variant} </label><span className='delete' onClick={() => {
                                let deleted = (options.map((o: any) => {
                                    return {variant: o.variant, answer: o.answer}
                                }))
                                console.log('DELETE' + key)
                                deleted.splice(key, 1)
                                setOptions(deleted)
                            }}><img src={trash} alt="Trash"/></span>
                            </div>
                        )}
                        {/*<button onClick={() => {*/}
                        {/*    console.log(options)*/}
                        {/*}*/}
                        {/*}>LOG OPTIONS*/}
                        {/*</button>*/}
                        {/*{options.map((o: any, key: any) =>
                            <div key={key} className="option">
                                <input name='single' checked={o.answer ? o.answer : null} onChange={(e) => {
                                    //Makes all attributes false
                                    selected = (options.map((o: any) => {
                                        return {variant: o.variant, answer: false}
                                    }))
                                    //And sets the answer to true only for the one that was selected
                                    selected[key] = {variant: e.target.value, answer: e.target.checked}
                                    //Writes the modified object to useState
                                    setSelectedAnswer(selected)
                                    console.log(selected)
                                }} id={key} type="radio" value={o.variant}/>
                                <label htmlFor={key}>{o.variant}</label>
                            </div>)}*/}
                    </div>}
                    {/*{optionsType === 1 &&*/}
                    {/*<div className='multiplyOptions'>*/}
                    {/*    /!*MAP*!/*/}
                    {/*    {options.map((o: any, key: any) =>*/}
                    {/*        <div key={key} className="option">*/}
                    {/*            <input type="checkbox" value={o.variant} onChange={(e) => {*/}
                    {/*                //@ts-ignore*/}
                    {/*                options[key] = {variant: e.target.value, answer: e.target.checked}*/}
                    {/*            }}/>*/}
                    {/*            <label>{o.variant}</label>*/}
                    {/*        </div>)}*/}
                    {/*</div>}*/}
                    {/*{optionsType === 2 && <div className='enterOptions'>*/}
                    {/*    <h2>Ответ на вопрос:</h2><p>{shortAnswer}</p>*/}
                    {/*    <h3>Регистр не учитивается</h3>*/}
                    {/*</div>*/}
                    {/*}*/}
                    <input type="text" placeholder='Введите вариант' className='enter' onKeyPress={handleKeyPress}/>
                    <div className="feedback">
                        <h2>Обратная связь</h2>
                        <h3>Правильно</h3>
                        <EditorJs
                            holder='feedback_true'
                            readOnly={false}
                            tools={EDITOR_JS_TOOLS}
                            data={selectedChapters.feedback_true}
                            instanceRef={(instance) => (instanceRefCorrect.current = instance)}
                        >
                            <div id='feedback_true'/>
                        </EditorJs>
                        <h3>Не правильно</h3>
                        <EditorJs
                            holder='feedback_false'
                            readOnly={false}
                            tools={EDITOR_JS_TOOLS}
                            data={selectedChapters.feedback_false}
                            instanceRef={(instance) => (instanceRefNoCorrect.current = instance)}
                        >
                            <div id='feedback_false'/>
                        </EditorJs>
                    </div>
                </div>
                }
                <div className="saveButtons">
                    <button className='saveIntro' type='submit' form="hook-form" onClick={() => {
                        handleSave().then(() => {
                            setValue('text', savedData)
                            if (selectedChapters.type === 'Test Chapter') {
                                setValue('feedback_true', feedbackTrueData)
                                setValue('feedback_false', feedbackFalseData)
                            }
                        })
                    }}>Сохранить
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTests