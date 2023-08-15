import './CardStatistics.scss'
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Modal, Table} from "antd";

const CardStatistics = ({title, number, icon, subtitle, data}: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const columns = [
        {
            title: 'Полное имя',
            dataIndex: 'user__first_name',
            //width: 180,
            // @ts-ignore
            render: (user__first_name: any, data: any) => (
                <Link to={`/dashboard/userDetail/${data.user__id}`}>
                    <div className='lessonTitle'>
                        <p>{user__first_name} {data.user__last_name}</p>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Никнейм',
            dataIndex: 'user__username',
            //width: 180,
            // @ts-ignore
            render: (user__username: any, data: any) => (
                <Link to={`/dashboard/userDetail/${data.user__id}`}>
                    <div className='lessonTitle'>
                        <p>{user__username}</p>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Курс',
            dataIndex: 'course__title',
            //width: 180,
            // @ts-ignore
            render: (course__title: any, data: any) => (
                <Link to={`/dashboard/userDetail/${data.user__id}`}>
                    <div className='lessonTitle'>
                        <p>{course__title}</p>
                    </div>
                </Link>
            ),
        },
    ];

    return (
        <>
            <div onClick={showModal} className='cardStatistics'>
                <div className="titleCard">
                    <h2>{number}</h2>
                    <img src={icon} alt="Users"/>
                </div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            <Modal centered title='Список' className='modalCourses' width={1000}
                   visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel} footer={null}>
                <p>Нажмите на имя человека чтобы узнать подробности о нем</p>
                <Table columns={columns} dataSource={data} scroll={{y: 440}}/>
            </Modal>
        </>

    )
}

export default CardStatistics