import React, { useState, useEffect } from "react";
import style from "../../CSS/HomePage/register.module.scss"
import Validation from 'hero-validate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register(props) {

    const rules = {
        username: "required|min:8",
        password: "required|min:8",
        fullname: "required",
        gender: "required|min:1",
        birthday: "required|date",
        phonenumber: "required|number",
        email: "required|email",
        address: "required|min:1"
    }
    Validation.setMessages({
        username: {
            required: "Chưa nhập tên đăng nhập",
            min: "Tên đang nhập quá ngắn",
        },
        password: {
            required: "Chưa nhập Mật khẩu",
            min: "Tên quá ngắn",
        },
        fullname: {
            required: "Chưa nhập Họ và Tên",
        },
        gender: {
            required: "Chưa chọn giới tính"
        },
        birthday: {
            required: "Chưa chọn ngày sinh",
            date: "Không phải định dạng ngày"
        },
        phonenumber: {
            required: "Chưa nhập số điện thoại",
            number: "Không phải số điện thoại",

        },
        email: {
            required: "Chưa nhập Email",
            email: "Đây không phải là Email",
        },
        address: {
            required: "Chưa nhập địa chỉ"
        }

    })


    const [rePassword, setRePassword] = useState("")
    const [errors, setErrors] = useState({})
    const [message, setMessages] = useState("")
    const [dataUser, setDataUser] = useState({})
    let navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token != null) {
            navigate("/")
        }
    })
    const handleSubmitRegister = (e) => {
        e.preventDefault()
        if (dataUser.password !== rePassword) {
            setErrors({ ...errors, rePassword: "Nhập lại mật khẩu sai" })
            return false
        }
        const result = Validation.validate(dataUser, rules);
        if (result.hasError) {
            setErrors(result.errors)
            console.log("first", typeof (result.errors))
            return false
        }
        setErrors({})
        axios.post('http://localhost:3000/api/register', {
            username: dataUser.username,
            password: dataUser.password,
            fullname: dataUser.fullname,
            gender: dataUser.gender,
            birthday: dataUser.birthday,
            email: dataUser.email,
            phonenumber: dataUser.phonenumber,
            address: dataUser.address,
        })
            .then(function (response) {
                console.log(response);
                navigate("/login")
            })
            .catch(function (error) {

                console.log(error.request.response);
                setMessages(error.request.response)
            });
    }
    return <>
        <div className={style.container_register}>
            <div className={style.content_middle}>
                <span className={style.title_register}>ĐĂNG KÝ</span>
                <form >
                    <input
                        type="text"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, username: e.target.value })}
                        placeholder="Tên đăng nhập" />
                    <p className={style.txt_error}>{errors.username}</p>
                    <input
                        type="password"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, password: e.target.value })}
                        placeholder="Mật khẩu" />
                    <p className={style.txt_error}>{errors.password}</p>
                    <input
                        type="password"
                        className={style.input_register}
                        onChange={(e) =>
                            setRePassword(e.target.value)}
                        placeholder="Nhập lại Mật khẩu" />
                    <p>{errors.rePassword}</p>
                    <input type="text"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, fullname: e.target.value })}
                        placeholder="Họ và tên" />
                    <p className={style.txt_error}>{errors.fullname}</p>
                    <div
                        className={style.input_gender}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, gender: e.target.value })} >
                        <span>Giới tính: </span>
                        <input type="radio" name="gender" value="Nam" />Nam
                        <input type="radio" name="gender" value="Nữ" /> Nữ
                    </div>
                    <p className={style.txt_error}>{errors.gender}</p>
                    <input type="date"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, birthday: e.target.value })}
                        placeholder="Ngày sinh" />
                    <p className={style.txt_error}>{errors.birthday}</p>
                    <input type="text"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, email: e.target.value })}
                        placeholder="Email" />
                    <p className={style.txt_error}>{errors.email}</p>
                    <input type="text"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, phonenumber: e.target.value })}
                        placeholder="Số điện thoại" />
                    <p className={style.txt_error}>{errors.phonenumber}</p>
                    <input type="text"
                        className={style.input_register}
                        onChange={(e) =>
                            setDataUser({ ...dataUser, address: e.target.value })}
                        placeholder="Địa chỉ" />
                    <p className={style.txt_error}>{errors.address}</p>
                    <p>{message}</p>
                    <input type="submit"
                        className={style.btn_register}
                        value="ĐĂNG KÝ" onClick={(e) => handleSubmitRegister(e)} />
                </form>

            </div>
        </div>
    </>
}

export default Register