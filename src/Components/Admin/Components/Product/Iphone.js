import React, { useEffect, useState, memo } from 'react';
import styles from '../../../../CSS/Admin/productmanager.module.scss'
import AddProduct from './AddProduct';
import axios from 'axios'
import { useSelector } from 'react-redux'
import ListTableProduct from './ListTableProduct';
function IphoneAdmin() {
    const status = useSelector(state => state.product.isChange)
    const [listIphone, setListIphone] = useState([])
    const [addProduct, setAddProduct] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:3000/api/iphone/')
            .then(function (response) {
                setListIphone(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [status])

    return (<>
        <div className={styles.container}>
            <div className={styles.tag_option_container}>
                <span className={styles.total_option}>Tổng số sản phẩm: {listIphone.length}</span>
                <button className={styles.btn_option} onClick={() => { setAddProduct(true) }}>Thêm sản phẩm</button>
                {addProduct
                    ? <>
                        <button onClick={() =>
                            setAddProduct(!addProduct)}
                            className={styles.btn_hidden_add_product}>
                            X
                        </button>
                        <AddProduct />
                    </>
                    : null}
            </div>
            <div>
                <table className={styles.table_product}>
                    <thead>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th>
                                Hình ảnh
                            </th>
                            <th>
                                Tên sản phẩm
                            </th>
                            <th>
                                Thông số kỹ thuật
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListTableProduct list={listIphone} />
                    </tbody>
                </table>
            </div>
        </div>

    </>);
}

export default memo(IphoneAdmin);