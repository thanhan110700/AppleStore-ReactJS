import React,{useEffect, useState} from "react";
import axios from "axios";
import style from '../../CSS/HomePage/userpage.module.scss'
import { useNavigate} from 'react-router-dom'
import {Container} from 'reactstrap'
import clsx from "clsx";
import UserInformaion from "./UserPage/UserInformation";
import UserOrder from './UserPage/UserOrder'
import {AiOutlineCamera} from "react-icons/ai"
function UserPage(){
    const [selectOption,setSelectOption] = useState("account")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [userData,setUserData] = useState('')
    useEffect(()=>{
        if(token==null){
            navigate("/")
        }
        axios.get('http://localhost:3000/api/getUser/'
                    +localStorage.getItem('id_user'),
                    {
                        headers:{
                            token:localStorage.getItem('token')
                        }
                    }
        )
        .then(function (response) {
        // handle success

            setUserData(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
        // handle error
            console.log(error);
        })
        
    },[])
    console.log("aaaa",userData)
    return <>
        <Container>
            <div className={style.content}>
                <div className={style.left_content}>
                    <div className={style.img_tag}>
                        <img className={style.img_avatar} alt="" src={userData.avatar} />
                        <div className={style.change_avatar}>
                            <p><AiOutlineCamera className={style.icon_camera}/></p>
                        </div>
                    </div>
                    <div className={style.fullname}>{userData.fullname}</div>
                    <div className={style.menubar_left}>
                        <div className={clsx(style.select_left,selectOption === 'account'? style.select_option_choose :"")} onClick={()=>setSelectOption("account")} >Quản lý tài khoản</div>
                        <div className={clsx(style.select_left,selectOption === 'order'? style.select_option_choose :"")} onClick={()=>setSelectOption("order")}>Đơn hàng</div>
                    </div>
                </div>
                <div className={style.right_content}>
                    {selectOption === 'account' && <UserInformaion userData={userData}/>}
                    {selectOption === 'order' &&  <UserOrder />}
                </div>
                <div className={style.transfer_mobile_app}>
                    <p>Chuyển sang ứng dụng điện thoại để xem nhiều chi tiết hơn</p>
                    <button className={style.btn_transfer}>Chuyển sang Ứng dụng</button>
                </div>
            </div>
        </Container>
    </>
}

export default UserPage