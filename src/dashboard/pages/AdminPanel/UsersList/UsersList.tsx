import './UsersList.scss'
import {Avatar, Button, Input, message, Select, Space, Table} from 'antd'
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks";
import {getAllUsersSelector, getUserDetailSelector} from "../../../../redux/selectors/usersSelectors";
import {useEffect, useState} from "react";
import {clearUserDetail, getAllUsers, putUserDetail} from "../../../../redux/reducers/usersReducer";
import Preloader from "../../../../landing/components/Preloader/Preloader";
import {SubmitHandler, useForm} from 'react-hook-form';
import defaultAvatar from "../../../../assets/icons/defaultAva.svg";
import {useTranslation} from "react-i18next";
import {getListAvailableCoursesSelector} from "../../../../redux/selectors/landingSelectors";
import {getAvailableCourses} from "../../../../redux/reducers/landingReducer";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {assignCourse} from '../../../../redux/reducers/coursesReducer';
import {Link, useNavigate} from 'react-router-dom'
import {getPermission} from "../../../../redux/selectors/authorizationSelectors";

const {Option} = Select;

const UsersList = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const permissionUser = useAppSelector(state => getPermission(state))
    const userDetail: any = useAppSelector(state => getUserDetailSelector(state))
    const allCourses: any = useAppSelector(state => getListAvailableCoursesSelector(state))
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalAssignVisible, setIsModalAssignVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [permission, setPermission] = useState(1);
    const [imgMentor, setImgMentor] = useState()
    const [imgMentorFile, setImgMentorFile] = useState()
    const [description, setDescription] = useState('')
    const {register, handleSubmit, control, formState: {errors}} = useForm<ChangeRoleType>();
    const showModal = () => {
        setIsModalVisible(true);
    }
    const showModalAssign = () => {
        setIsModalAssignVisible(true);
    }
    const handleOk = () => {
        setIsModalVisible(false);
        setIsModalAssignVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalAssignVisible(false);
        dispatch(clearUserDetail())
    };
    const handleChange = (value: number) => {
        setPermission(value)
    }
    const uploadImgMentor = {
        accept: '.png, .jpg, .jpeg',
        showUploadList: false,
        name: 'file',
        multiple: false,
        customRequest: (file: any) => {
            setImgMentorFile(file.file)
            let reader = new FileReader();
            let url = reader.readAsDataURL(file.file);
            reader.onloadend = () => {
                // @ts-ignore
                setImgMentor(reader.result)
            }
        }
    }
    type ChangeRoleType = {
        permission: number
        teacher_image: string
        teacher_description: string
        course: string
    }
    const onSubmit: SubmitHandler<ChangeRoleType> = (data): any => {
        let request = {...userDetail}
        request.permission = permission
        if (data.teacher_description) {
            request.description = data.teacher_description
        } else {
            delete request.description
        }
        if (imgMentorFile) {
            request.image = imgMentorFile
        } else {
            delete request.image
        }
        dispatch(putUserDetail(request)).then(() => {
            dispatch(getAllUsers())
            setIsModalVisible(false);
            setDescription('')
            message.success('Изменения успешно сохранены');
        })
    }
    const onSubmitAssign: SubmitHandler<ChangeRoleType> = (data): any => {
        let request: any = {
            course: data.course,
            user: userDetail.id
        }
        dispatch(assignCourse(request)).then(() => {
            dispatch(getAllUsers())
            setIsModalAssignVisible(false);
            message.success('Курс куплен/продлен');
            //dispatch(saveHistory(request))
        })
    }

    const users: any = useAppSelector(state => getAllUsersSelector(state))
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAvailableCourses())
    }, [])
    if (!users) {
        return <Preloader/>
    }
    //Table search button
    let searchInput: any
    let getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node: any) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    let handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    let handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('')
    };
    const columns = [
        {
            title: t("name"),
            dataIndex: 'full_name',
            key: 'full_name',
            //width: 180,
            ...getColumnSearchProps('full_name'),
            render: (full_name: any, data: any) => (
                <Link to={`/dashboard/userDetail/${data.id}`}>
                    <div className='tableName'>
                        <Avatar draggable={false} size={20}
                                src={data.avatar}
                                icon={<img src={defaultAvatar} alt="Avatar"/>}/>
                        <p>{full_name}</p>
                    </div>
                </Link>

            )
        },
        {
            title: 'Статус',
            // width: 200,
            dataIndex: 'is_active',
            render: (is_active: any) => (
                <>{is_active ? <p>Активен</p> : <p>Не активен</p>}</>
            ),
        },
        {
            title: 'Роль',
            dataIndex: 'permission',
            //width: 180,
        }
    ];
    //Protection to prevent certain roles from accessing the page
    if (permissionUser === 'User' || permissionUser === 'Student') {
        navigate('/dashboard/')
    }

    if (!allCourses) {
        return <Preloader/>
    }
    return (
        <div className='userList'>
            <h2 className='title'>Список пользователей</h2>
            <h3 className='sub-title'>Всего: {users.length}</h3>
            {/*@ts-ignore*/}
            <Table columns={columns} dataSource={users} pagination={{pageSize: 10, showSizeChanger: false}}/>
        </div>
    )
}

export default UsersList