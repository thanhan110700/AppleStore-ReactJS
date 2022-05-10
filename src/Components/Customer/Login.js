import React,{useState, useEffect} from 'react'
import {Row,Col, Container } from 'reactstrap'
import clsx from 'clsx'
import style from '../../CSS/HomePage/login.module.scss'
import content from '../../CSS/HomePage/homepage.module.scss'
import { GrFacebook, GrGoogle } from "react-icons/gr";
import { useNavigate  } from "react-router-dom";
import axios from 'axios'


export default function Login(){


    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [alertMessage,setAlertMessage] = useState("")
    let navigate = useNavigate();
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(token!=null){
            navigate("/")
        }
    })
    const handleSubmitLogin = e =>{
        e.preventDefault()
        if(username==='admin'){
            axios.post('http://localhost:3000/api/admin/login', {
                username: username,
                password: password
              })
            .then(function (response) {
                            localStorage.setItem("token",response.data.token)
                            localStorage.setItem("id_user",response.data.id)
                            navigate("/admin")
                        })
            .catch(function (error) {
                setAlertMessage("Sai tài khoản hoặc mật khẩu")
            });
        }
        else{
            axios.post('http://localhost:3000/api/login', {
            username: username,
            password: password
          })
          .then(function (response) {
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("id_user",response.data.id)
                        navigate("/")
                    })
          .catch(function (error) {
            setAlertMessage("Sai tài khoản hoặc mật khẩu")
          });
        }
    }

    return (
        <div className={content.content}>
            <Container>
                <Row>
                    <Col lg={7} className={style.content_right}>
                        <img alt="" src='https://pngimg.com/uploads/iphone_13/iphone_13_PNG6.png' className={style.img_right} />
                    </Col>
                    <Col lg={5} className={style.content_left}>
                       
                        <div className={style.form_login}>
                            <span className={style.title_login}>Đăng nhập</span>                
                            <form>
                                <input type="text" className={style.input_login} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tên đăng nhập"/>
                                <input type="password" className={style.input_login} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu"/>
                                <p className={style.alert_message}>{alertMessage}</p>
                                <button className={style.btn_login} onClick={(e)=>handleSubmitLogin(e)}>ĐĂNG NHẬP</button>
                            </form>
                            <div className={style.tag_loginwith}>
                            
                                <button className={clsx(style.btn_loginwith,style.btn_loginwithFB)}>
                                    <GrFacebook className={style.icon_loginwith}/>
                                    <span>ĐĂNG NHẬP BẰNG FACEBOOK</span>
                                </button>
                            </div>
                            <div className={style.tag_loginwith}>
                                <button className={clsx(style.btn_loginwith,style.btn_loginwithGG)}>
                                    <GrGoogle className={style.icon_loginwith}/>
                                    <span>ĐĂNG NHẬP BẰNG GOOGLE</span>
                                    </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}