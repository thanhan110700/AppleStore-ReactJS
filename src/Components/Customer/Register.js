import React, {useState, useEffect} from "react";
import style from "../../CSS/HomePage/register.module.scss"
import clsx from 'clsx'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Register(props){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [rePassword,setRePassword] = useState("")
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [gender,setGender] = useState("")
    const [birthday,setBirthday] = useState("")
    const [email,setEmail] = useState("")
    const [phonenumber,setPhonenumber] = useState("")
    const [address,setAddress] = useState("")
   
    let navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(token!=null){
            navigate("/")
        }
    })
    const handleSubmitRegister =(e) =>{
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
            fullname: firstname+" "+lastname,
            gender: gender,
            birthday:birthday,
            email: email,
            phonenumber: phonenumber,
            address:address
        }
        
        
        axios.post('http://localhost:3000/api/register', {
            username: newUser.username,
            password: newUser.password,
            fullname: newUser.fullname,
            gender: newUser.gender,
            birthday: newUser.birthday,
            email: newUser.email,
            phonenumber: newUser.phonenumber,
            address: newUser.address
          })
          .then(function (response) {
            console.log(response);
            navigate("/login")
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    console.log("first",birthday)
    return <>
            <div className={style.container_register}>
                <div className={style.content_middle}>
                    <span className={style.title_register}>ĐĂNG KÝ</span>                
                    <form >
                        <input type="text" className={style.input_register} value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Tên đăng nhập"/>
                        <input type="password" className={style.input_register} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mật khẩu"/>
                        <input type="password" className={style.input_register} value={rePassword} onChange={(e)=>setRePassword(e.target.value)} placeholder="Nhập lại Mật khẩu"/>
                        <input type="text" className={clsx(style.input_register,style.input_name)} value={firstname} onChange={(e)=>setFirstname(e.target.value)} placeholder="Họ"/>
                        <div className={style.space_input_name}></div>
                        <input type="text" className={clsx(style.input_register,style.input_name)} value={lastname} onChange={(e)=>setLastname(e.target.value)} placeholder="Tên"/><br/>
                        
                        <div className={style.input_gender} onChange={(e)=> setGender(e.target.value)} >
                            <span>Giới tính: </span>
                            <input type="radio" name="gender" value="Nam"/>Nam
                            <input type="radio" name="gender" value="Nữ"/> Nữ
                        </div>
                        <input type="date" className={style.input_register} value={birthday} onChange={(e)=>setBirthday(e.target.value)} placeholder="Ngày sinh"/>
                        <input type="text" className={style.input_register} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                        <input type="text" className={style.input_register} value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} placeholder="Số điện thoại"/>
                        <input type="text" className={style.input_register} value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Địa chỉ"/>
                        <input type="submit" className={style.btn_register} value="ĐĂNG KÝ" onClick={(e) => handleSubmitRegister(e)}/>
                    </form>
                    
                </div>
            </div>
    </>
}

export default Register