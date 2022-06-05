import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import styles from '../../../CSS/Admin/ordermanager.module.scss'
import ItemOrder from '../../Customer/UserPage/ItemOrder';
import { BsFilter } from "react-icons/bs"
function RevenueManager() {
    const [reset, setReset] = useState(0)
    const [showPreview, setShowPreview] = useState(false)
    const [listPresent, setListPresent] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [listOrderPreview, setListOrderPreview] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        axios.post("http://localhost:3000/api/filterOrder",
            {
                date_start: startDate ? startDate : "",
                date_end: endDate ? endDate : "",
                status: 4,
            },
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                const data = response.data
                console.log("first", data)
                setListPresent(data)
                let total = 0
                data && data.map((value) => {
                    console.log(value.total)
                    total += parseInt(value.total)
                })
                setTotalPrice(total)
            })
    }, [reset])

    const handleShowPreview = (list) => {
        setListOrderPreview(list)
        setShowPreview(!showPreview)
    }

    const onchangeStartDate = (value) => {
        setStartDate(value)
        setReset(reset + 1)
    }
    const onchangeEndDate = (value) => {
        setEndDate(value)
        setReset(reset + 1)
    }

    function TagPreview() {
        return <div className={styles.tag_container_product}>
            <div>
                <p onClick={() => { setShowPreview(!showPreview) }} className={styles.btn_close}>X</p>
            </div>
            {
                listOrderPreview.map((data, index) => {
                    return <ItemOrder data={data} key={index} />
                })
            }
        </div>

    }
    console.log("listOrder", listPresent)
    return (<>
        <div className={styles.container}>
            <div className={clsx(styles.tag_preview_product, showPreview ? styles.show : styles.hidden)}>
                <TagPreview />
            </div>
            <div className={styles.tag_txt_filter}>
                <p className={styles.txt_filter}>Lọc </p>
                <BsFilter className={styles.txt_filter} />
            </div>
            <div className={styles.tag_pick_date}>
                Ngày bắt đầu:
                <input
                    type="date"
                    className={styles.input_pickdate}
                    value={startDate}
                    onChange={(e) =>
                        onchangeStartDate(e.target.value)}
                    placeholder="Ngày bắt đầu" />
                Ngày kết thúc:
                <input
                    type="date"
                    className={styles.input_pickdate}
                    value={endDate}
                    onChange={(e) =>
                        onchangeEndDate(e.target.value)}
                    placeholder="Ngày kết thúc" />
            </div>
            <div>
                <p>Doanh thu: {totalPrice.toLocaleString()} VNĐ</p>
            </div>
            <table className={styles.tag_list_order}>
                <thead>
                    <tr>
                        <th>
                            STT
                        </th>
                        <th>
                            Mã hóa đơn
                        </th>
                        <th>
                            Mã khách hàng
                        </th>
                        <th>
                            Thông tin hóa đơn
                        </th>
                        <th>
                            Giá trị đơn hàng
                        </th>
                        <th>
                            Ngày đặt hàng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listPresent.map((data, index) => {
                        return <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {data._id}
                            </td>
                            <td>
                                {data.idUser}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleShowPreview(data.detail)}
                                >Xem</button>
                            </td>
                            <td>
                                {parseInt(data.total).toLocaleString()} VNĐ
                            </td>
                            <td>
                                {data.createAt.slice(11, 19)
                                    + " " + data.createAt.slice(0, 10)}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>);
}

export default RevenueManager;