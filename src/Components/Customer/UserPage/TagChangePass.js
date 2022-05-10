import React,{useState} from 'react';
import clsx from "clsx";
import axios from 'axios';
import style from "../../../CSS/UserPage/userinformation.module.scss"
function TagChangePass() {
    const [oldPass,setOldPass] = useState('')
    const [reNewPass,setReNewPass] = useState('')
    const [newPass,setNewPass] = useState('')
    const [message,setMessage] = useState('')
    const handleChangePass = ()=>{
        if(newPass===reNewPass){
            axios.post('http://localhost:3000/api/changePassword', {
            id:localStorage.getItem('id_user'),
            old_password:oldPass,
            new_password:newPass,
            token:localStorage.getItem('token')
          })
          .then(function (response) {
                        setMessage("Cập nhật mật khẩu thành công")
           })
          .catch(function (error) {
            setMessage("Cập nhật mật khẩu thất bại. Lỗi ",error);
            console.log(error)
          });
        }
        else{
            setMessage("nhập lại mật khẩu sai")
        }
    }
    return ( <>
        <div className={style.div_change_pass}>
            <div className={style.text_change_pass}>ĐỔI MẬT KHẨU</div>
            <input type="password" className={style.input_change_pass} value={oldPass} onChange={(e)=>setOldPass(e.target.value)} placeholder="Nhập mật khẩu cũ" />
            <input type="password" className={style.input_change_pass} value={newPass} onChange={(e)=>setNewPass(e.target.value)} placeholder="Nhập mật khẩu mới" />
            <input type="password" className={style.input_change_pass} value={reNewPass} onChange={(e)=>setReNewPass(e.target.value)} placeholder="Nhập lại mật khẩu mới" />
            <p className='mt-2'>{message}</p>
            <button
            onClick={()=>handleChangePass()}
             className={clsx(style.btn_change,style.margin_top_1em)}>ĐỔI MẬT KHẨU</button>
        </div>
    </> );
}

export default TagChangePass;