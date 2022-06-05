import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../CSS/HomePage/doneorderpage.module.scss'
function DoneOrderPage() {
    let navigate = useNavigate();
    const handleBackTohome = () => {
        navigate("/")
    }
    return (<>
        <div className={styles.tag}>
            <div className={styles.tag_img}>
                <img className={styles.img} src='https://laptophaidang.com/pic/product/images/success.png' alt="" />
            </div>
            <div className={styles.tag_bottom}>
                <p>Đặt hàng thành công</p>
                <button 
                className={styles.btn_back_tohome}
                onClick={handleBackTohome}>
                    Trở về trang chủ
                </button>
            </div>
        </div>

    </>);
}

export default DoneOrderPage;