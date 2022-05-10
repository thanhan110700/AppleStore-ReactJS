import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from '../../../CSS/HomePage/header.module.scss'
import { useNavigate  } from "react-router-dom";
function DropdownUser() {
    let navigate = useNavigate();
    const handleBtnLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('id_user')
        navigate("/")
    }
    if(!localStorage.getItem("token")){
        return <div className={clsx(style.dropdown_content)}>
                    <Link to="/login">
                        <div className={style.option_account}>
                            Đăng nhập
                        </div>
                    </Link>
                    <Link to="/register" >
                        <div className={style.option_account}>
                            Đăng ký
                        </div>
                    </Link>
                
            </div>
    }
    else{
        return <div  className={clsx(style.dropdown_content)}> 
                    <Link to="/user" >
                        <div className={style.option_account}>
                            Cá nhân
                        </div>
                    </Link>
                    <Link to="/" >
                        <div className={style.option_account} onClick={()=>handleBtnLogout()}>
                            Đăng xuất
                        </div>
                    </Link>
        </div>
    }

}

export default DropdownUser;