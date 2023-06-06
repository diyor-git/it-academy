import './Sidebar.scss'
import {Menu} from 'antd'
import {useState} from "react"
import logo from '../../../assets/image/logoLMS.png'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks"
import plus from '../../../assets/image/plus.png'
import {getTestsDetailSelector} from "../../../redux/selectors/coursesSelectors"
import {clearSelectedChapter, renderSelectedChapter, setSelectedChapter} from "../../../redux/reducers/coursesReducer"

const LearnSidebar = () => {
    const dispatch = useAppDispatch()
    let testsDetail = useAppSelector(state => getTestsDetailSelector(state))
    let [collapsed, setCollapsed] = useState(false)
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
                {testsDetail.intro &&
                <Menu.Item onClick={() => {
                    dispatch(setSelectedChapter(testsDetail.intro))
                    dispatch(renderSelectedChapter(true))
                }} key="intro">
                    {testsDetail.intro.greetings}
                </Menu.Item>}
                {!testsDetail.intro && <button className='addChapter'>Создайте интро</button>}
                {testsDetail.chapters && testsDetail.chapters.map((c: any) =>
                    <Menu.Item onClick={() => {
                        dispatch(setSelectedChapter({
                            text: {},
                            type: 'Theory Chapter'
                        }))
                        dispatch(setSelectedChapter(c))
                        dispatch(renderSelectedChapter(true))
                    }} key={c.id}>
                        {c.question}
                    </Menu.Item>)}
                {testsDetail.intro &&
                <button className='addChapter' onClick={() => {
                    dispatch(setSelectedChapter({
                        text: {},
                        type: 'Test Chapter'
                    }))
                    dispatch(clearSelectedChapter(true))
                }}>
                    <img src={plus} alt=""/>Создать вопрос
                </button>}
            </Menu>
        </div>
    )
}

export default LearnSidebar