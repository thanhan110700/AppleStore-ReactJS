import axios from "axios";
import clsx from "clsx";
import React, {useState, useLayoutEffect} from "react";
import { Col, Container, Row } from "reactstrap";
import {GiCancel} from 'react-icons/gi'
import style from "../../../CSS/UserPage/userinformation.module.scss"
import TagChangePass from "./TagChangePass";
function UserInformaion({userData}){

    const [dataUser,setDataUser] = useState({})
    const [toggleChangePass,setToggleChangePass] = useState(false)
    console.log(typeof birthday)
    const [message,setMessage] = useState("")
    const lc = 2
    const rc = 10
    useLayoutEffect(()=>{
        setDataUser(userData)
    },[userData])

    
    const handleChangeInfor = () =>{
        axios.post('http://localhost:3000/api/changeUser', {
            id:localStorage.getItem('id_user'),
            fullname: dataUser.fullname,
            phonenumber:dataUser.phonenumber,
            gender:dataUser.gender,
            address:dataUser.address,
            email:dataUser.email,
            token:localStorage.getItem('token')
          })
          .then(function (response) {
                        setMessage("Cập nhật thành công")
           })
          .catch(function (error) {
            setMessage("Cập nhật thất bại, Lỗi ",error.message)
          });
    }

    return <>
        <Container className={style.container}>
            <Row>
                <Col lg={12}>
                    <p className={style.title_tag}>QUẢN LÝ TÀI KHOẢN</p>
                    <p className={style.title_little}>Quản lý tài khoản bảo mật của bạn</p>
                    <Row>
                        <Col lg={lc} className={style.text_input}>
                            <p>Tên đăng nhập:</p>
                        </Col>
                        <Col lg={rc}>
                            <p>{dataUser.username}</p>
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Mật khẩu:</p>
                        </Col>
                        <Col lg={rc}>
                            <button className={style.btn_change} onClick={()=>setToggleChangePass(true)}>Đổi mặt khẩu</button>
                            <div className={clsx(style.tag_change_pass,toggleChangePass?style.display_show:"")}>
                                <div className={style.btn_cancel_tag_change} onClick={()=>setToggleChangePass(false)}>
                                <GiCancel className={style.icon_cancel} />
                                </div>
                                <TagChangePass />
                            </div>
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Tên: </p>
                        </Col>
                        <Col lg={rc}>
                            <input 
                            type="text" 
                            value={dataUser.fullname} 
                            className={style.input_tranf}  
                            onChange={(e)=>setDataUser({...dataUser, fullname: e.target.value})} />
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Số điện thoại:</p>
                        </Col>
                        <Col lg={rc}>
                            <input type="text" value={dataUser.phonenumber} className={style.input_tranf}   onChange={(e)=>setDataUser({...dataUser, phonenumber: e.target.value})} />
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Ngày sinh:</p>
                        </Col>
                        <Col lg={rc}>
                        <input 
                        type="date" 
                        className={style.input_tranf}
                         value={dataUser.birthday && new Date(dataUser.birthday).toISOString().slice(0,10)}
                          onChange={(e)=>{setDataUser({...dataUser, birthday: e.target.value})}} placeholder="Ngày sinh"/>
                        </Col>
                        
                        <Col lg={lc} className={style.text_input}>
                            <p>Giới tính: </p>
                        </Col>
                        <Col lg={rc}>
                        <div className={style.input_gender} >
                            
                            <input type="radio" name="gender" value="Nam" onChange={(e)=> setDataUser({...dataUser, gender: e.target.value})} checked={dataUser.gender==="Nam" ? true : false}/>Nam
                            <input type="radio" name="gender" value="Nữ" onChange={(e)=> setDataUser({...dataUser, gender: e.target.value})} checked={dataUser.gender==="Nữ" ? true : false} /> Nữ
                        </div>
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Địa chỉ</p>
                        </Col>
                        <Col lg={rc}>
                            <input type="text" className={style.input_tranf} value={dataUser.address}  onChange={(e)=>setDataUser({...dataUser, address: e.target.value})}/>
                        </Col>
                        <Col lg={lc} className={style.text_input}>
                            <p>Email</p>
                        </Col>
                        <Col lg={rc}>
                            <input type="text" className={style.input_tranf} value={dataUser.email}  onChange={(e)=>setDataUser({...dataUser, email: e.target.value})} />
                        </Col>
                        <Col lg={lc}>
                        </Col>
                        <Col lg={rc}>
                            <button className={style.btn_change} onClick={()=> handleChangeInfor()}>Sửa thông tin</button>
                            <span className={style.message_alert}>{message}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </Container>
    </>
}
export default UserInformaion