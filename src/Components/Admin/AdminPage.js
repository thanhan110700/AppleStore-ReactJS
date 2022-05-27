import React, { useEffect, useState } from 'react';
import styles from '../../CSS/Admin/adminpage.module.scss'
import clsx from 'clsx'
import ProductManager from './Components/ProductsManager';
import AdminHomePage from './Components/AdminHomePage';
import UserManager from './Components/UserManager';
import OrderManager from './Components/OrderManager';
import RevenueManager from './Components/RevenueManager';
import { useNavigate } from 'react-router-dom';
function AdminPage() {

    const [activeOption, setActiveOption] = useState(0);
    let navigate = useNavigate();
    return (<>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.tag_title_header}>
                    <p className={styles.title_header}>ADMIN PAGE</p>
                </div>
                <div className={styles.tag_img_avatar}>
                    <img className={styles.img_avatar} src="https://www.clipartmax.com/png/full/319-3191274_male-avatar-admin-profile.png" alt='' />
                    <span className={styles.txt_nameadmin}>Admin</span>
                </div>
                <div className={styles.tag_option}>
                    <ul>
                        <li
                            className={
                                clsx(styles.option,
                                    activeOption === 0 ?
                                        styles.option_active : '')
                            }
                            onClick={() => setActiveOption(0)}
                        >
                            Trang chủ
                        </li>
                        <li
                            className={
                                clsx(styles.option,
                                    activeOption === 1 ?
                                        styles.option_active : '')
                            }
                            onClick={() => setActiveOption(1)}
                        >
                            Quản lý sản phẩm
                        </li>
                        <li
                            className={
                                clsx(styles.option,
                                    activeOption === 2 ?
                                        styles.option_active : '')
                            }
                            onClick={() => setActiveOption(2)}
                        >
                            Quản lý người dùng
                        </li>
                        <li
                            className={
                                clsx(styles.option,
                                    activeOption === 3 ?
                                        styles.option_active : '')
                            }
                            onClick={() => setActiveOption(3)}
                        >
                            Quản lý đơn hàng
                        </li>
                        <li
                            className={
                                clsx(styles.option,
                                    activeOption === 4 ?
                                        styles.option_active : '')
                            }
                            onClick={() => setActiveOption(4)}
                        >
                            Quản lý Doanh thu
                        </li>
                        <li className={clsx(styles.option, styles.btn_logout)}
                            onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('id_user')
                                navigate("/")
                            }}
                        >
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                {activeOption === 0 && <AdminHomePage />}
                {activeOption === 1 && <ProductManager />}
                {activeOption === 2 && <UserManager />}
                {activeOption === 3 && <OrderManager />}
                {activeOption === 4 && <RevenueManager />}
            </div>
        </div>
    </>);
}

export default AdminPage;