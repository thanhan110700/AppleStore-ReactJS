import React, { useEffect, useLayoutEffect, useState } from 'react';
import style from '../../../CSS/UserPage/userorder.module.scss'
import ItemOrder from '../UserPage/ItemOrder';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { changeStatus} from '../../../store/actions/productActions'
function ListOrder({ value, isCancel }) {
    const [listProduct, setListProduct] = useState([])
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        console.log(listProduct)
        setListProduct(value.detail)
    }, [value])

    const handleCancelOrder = () => {

        console.log("alo")
        axios.post("http://localhost:3000/api/cancelOrder/", {
            id: value._id,
            token: localStorage.getItem("token")
        })
            .then((response) => {
                console.log(response);
                dispatch(changeStatus())
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (<>
        <div className={style.container_list}>
            <p className={style.txt_id_order}>
                Mã hóa đơn:{value._id}
            </p>
            <p className={style.txt_date_order}>
                Ngày đặt hàng: {value.createAt}
            </p>
            <div className={style.list_item}>
                {listProduct.map((data, index) => {
                    return <ItemOrder data={data} key={index} />
                })}
            </div>
            <div className={style.note_product}>
                Bạn hài lòng với sản phẩm đã nhận? Nếu không, vui lòng chọn "Hủy đơn hàng" trước ngày 24/03/2022
            </div>
            <div className={style.status}>
                Tình trạng đơn hàng:
                {(value.status === 1 ? "Chờ xác nhận" : "")}
                {(value.status === 2 ? "Chờ lấy hàng" : "")}
                {(value.status === 3 ? "Đang giao" : "")}
                {(value.status === 4 ? "Đã giao" : "")}
                {(value.status === 5 ? "Đã hủy" : "")}

            </div>
            {value.status === 1 || value.status === 2 || value.status === 3
                ? <div className={style.btn_tag}>
                    <button
                        onClick={() =>
                            handleCancelOrder(value._id)}
                        className={style.btn_cancel}>
                        Hủy đơn hàng
                    </button>
                </div> : ""}
        </div>
    </>);
}

export default ListOrder;