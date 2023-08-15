import './Sidebar.scss'
import {Menu} from 'antd'
import {useEffect, useState} from "react"
import logo from '../../../assets/image/logoLMS.png'
import {Link, useLocation} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import plus from '../../../assets/image/plus.png'
import {getTheoryDetailSelector} from "../../../redux/selectors/coursesSelectors"
import {clearSelectedChapter, renderSelectedChapter, setSelectedChapter} from "../../../redux/reducers/coursesReducer"

const TheorySidebar = () => {
    const dispatch = useAppDispatch()
    let location = useLocation()
    let [collapsed, setCollapsed] = useState(false)
    let theoryDetail = useAppSelector(state => getTheoryDetailSelector(state))
    let keys = 0
    let toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <div className='sidebar'>
            <Menu
                defaultSelectedKeys={['intro']}
                defaultOpenKeys={['intro']}
                mode="inline"
                className='menu'
                inlineCollapsed={collapsed}
            >
                <Link to='/dashboard'>
                    <div className="logo">
                        <img src={logo} alt="Logo"/>
                    </div>

                </Link>
                {theoryDetail.intro &&
                <Menu.Item onClick={() => {
                    dispatch(setSelectedChapter(theoryDetail.intro))
                    dispatch(renderSelectedChapter(true))
                }} key="intro">
                    {theoryDetail.intro.title}
                </Menu.Item>}
                {!theoryDetail.intro && <button className='addChapter'>Создайте интро</button>}
                {theoryDetail.chapters_and_labs && theoryDetail.chapters_and_labs.map(c =>
                    <Menu.Item onClick={() => {
                        dispatch(setSelectedChapter({
                            text: {},
                            type: 'Theory Chapter'
                        }))
                        dispatch(setSelectedChapter(c))
                        dispatch(renderSelectedChapter(true))
                    }} key={keys += 1}>
                        {c.title}
                    </Menu.Item>)}
                {theoryDetail.lab &&
                <Menu.Item onClick={() => {
                    dispatch(setSelectedChapter({
                        text: {},
                        type: 'Theory Lab'
                    }))
                    dispatch(renderSelectedChapter(true))
                    dispatch(setSelectedChapter(theoryDetail.lab))
                }} key={keys += 1}>
                    {theoryDetail.lab.title}
                </Menu.Item>}
                {theoryDetail.intro &&
                <button className='addChapter' onClick={() => {
                    dispatch(setSelectedChapter({
                        text: {},
                        type: 'Theory Chapter'
                    }))
                    dispatch(clearSelectedChapter(true))
                }}>
                    <img src={plus} alt=""/>Создать главу
                </button>}
                {theoryDetail.intro &&
                <button className='addChapter' onClick={() => {
                    dispatch(setSelectedChapter({
                        text: {},
                        type: 'Theory Lab',
                        isModal: true
                    }))
                    dispatch(clearSelectedChapter(true))
                }}>
                    <img src={plus} alt=""/>Создать лабу
                </button>}
            </Menu>
        </div>
    )
}

export default TheorySidebar