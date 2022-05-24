import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../../CSS/Admin/usermanager.module.scss'
function UserManager() {
    const [listUser,setListUser] = useState([])
    const [listOrder,setListOrder] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/getAllUser",
            {
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            .then(response =>{
                setListUser(response.data)
            })
        axios.get('http://localhost:3000/api/listOrder/',
            {
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response.data);
                setListOrder(response.data)
            })
    },[])
    console.log("first",listUser)
    return ( <>
    <div>
        <table>
            <thead>
                <tr>
                    <th
                        className={styles.column_number}
                    >
                        STT
                    </th>
                    <th
                        className={styles.column_avatar}
                    >
                        Avatar
                    </th>
                    <th
                        className={styles.column_username}
                    >
                        Tên khách hàng
                    </th>
                    <th
                        className={styles.column_inforUser}
                    >
                        Thông tin khách hàng
                    </th>
                    <th
                        className={styles.column_totalOrder}
                    >
                        Tổng số đơn hàng
                    </th>
                    <th
                        className={styles.column_amountOrder}
                    >
                        Tổng giá trị đơn hàng
                    </th>
                </tr>
            </thead>
            <tbody>
                {listUser.map((data,index)=>{
                    return <tr key={index}>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                <img 
                                    src={data.avatar} 
                                    alt={index} 
                                    className={styles.img_avatar}/>
                            </td>
                            <td>
                                {data.fullname}
                            </td>
                            <td>
                                <div className={styles.infor_user}>
                                    <div className={styles.infor_left}>
                                        <ul>
                                            <li>
                                                Giới tính: {data.gender}
                                            </li>
                                            <li>
                                                Địa chỉ: {data.address}
                                            </li>
                                            <li>
                                                Ngày sinh: {data.birtday}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.infor_right}>
                                    <ul>
                                            <li>
                                                Email: {data.email}
                                            </li>
                                            <li>
                                                Số điện thoại: {data.phonenumber}
                                            </li>
                                            <li>
                                                Ngày tạo tài khoản: {data.createAt}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {(listOrder.filter(e => 
                                    {
                                        return e.idUser === data._id
                                    })).length}
                            </td>
                            <td>
                                {listOrder.filter(e => 
                                    {
                                        return e.idUser === data._id
                                                && e.status === 4
                                    }).reduce((partialSum, a) => partialSum + parseInt(a.total),0).toLocaleString()} VNĐ
                            </td>
                        </tr>
                })}
            </tbody>
        </table>
    </div>

    </>);
}

export default UserManager;