import './CheckLab.scss'
import {Select, Table} from 'antd'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getLabList} from "../../../../redux/reducers/usersReducer";
import {getLabListSelector} from '../../../../redux/selectors/usersSelectors';
import {getPermission} from '../../../../redux/selectors/authorizationSelectors';

const {Option} = Select;

const CheckLab = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const permission = useAppSelector(state => getPermission(state))
    let labList = useAppSelector(state => getLabListSelector(state))
    useEffect(() => {
        dispatch(getLabList())
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [])
    // if (!users) {
    //     return <Preloader/>
    // }
    const columns = [
        {
            title: 'Имя',
            dataIndex: 'full_name',
            //width: 180,
            // @ts-ignore
            render: (full_name, data) => (
                <Link to={`/dashboard/checkLab/lab/${data.id}`}>
                    <p>{full_name}</p>
                </Link>)
        },
        {
            title: 'Курс',
            // width: 200,
            dataIndex: 'course',
        },
        {
            title: 'Урок',
            dataIndex: 'lesson',
            //width: 180,
            // @ts-ignore
        },
        {
            title: 'Лаба',
            dataIndex: 'lab',
            //width: 180,
            // @ts-ignore
        },
    ];

    //Protection to prevent certain roles from accessing the page
    if (permission === 'User' || permission === 'Student' || permission === 'Manager') {
        navigate('/dashboard/')
    }

    return (
        <div className='checkLab'>
            <h2 className='title'>Проверить лабораторные</h2>
            {/*//@ts-ignore*/}
            <Table columns={columns} dataSource={labList} pagination={{pageSize: 50}} scroll={{y: 940}}/>
        </div>
    )
}

export default CheckLab