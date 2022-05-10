import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../../CSS/Admin/usermanager.module.scss'
function UserManager() {
    const [listUser,setListUser] = useState([])
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
    },[])
    console.log("first",listUser)
    return ( <>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        STT
                    </th>
                    <th>
                        Avatar
                    </th>
                    <th>
                        Tên khách hàng
                    </th>
                    <th>
                        Thông tin khách hàng
                    </th>
                    <th>
                        Tổng số đơn hàng
                    </th>
                    <th>
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
                                <img src='' />
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
                        </tr>
                })}
            </tbody>
        </table>
    </div>

    </>);
}

export default UserManager;