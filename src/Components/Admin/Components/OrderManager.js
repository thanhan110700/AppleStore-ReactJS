import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import styles from '../../../CSS/Admin/ordermanager.module.scss'
import ItemOrder from '../../Customer/UserPage/ItemOrder';
import { BsFilter } from "react-icons/bs"
function OrderManager() {
    const [listOrder, setListOrder] = useState([])
    const [reset, setReset] = useState(0)
    const [showPreview, setShowPreview] = useState(false)
    const [optionFilter, setOptionFilter] = useState(0)
    const [listPresent, setListPresent] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [listOrderPreview, setListOrderPreview] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/api/listOrder",
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log("first", response.data)
                setListOrder(response.data)

                if (optionFilter === 0) {
                    console.log("alo")
                    setListPresent(response.data)
                }
                else {
                    setListPresent(listOrder.filter((value) => {
                        return value.status === optionFilter
                    }))
                }

            })
    }, [reset])

    const hanldeChangeList = (e) => {
        setOptionFilter(parseInt(e))
        setReset(reset + 1)
    }
    const changeStatus = (status, id) => {
        axios.post("http://localhost:3000/api/changeStatusOrder",
            {
                status: status,
                id: id,
                token: localStorage.getItem('token')
            })
            .then(response => {
                console.log("change", response.data)
                setReset(reset + 1)
            })
    }
    const handleShowPreview = (list) => {
        setListOrderPreview(list)
        setShowPreview(!showPreview)
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
                <select
                    className={styles.select}
                    onChange={(event) => hanldeChangeList(event.target.value)}
                    value={optionFilter}
                >
                    <option value={0}>Tất cả</option>
                    <option value={1}>Chờ xác nhận</option>
                    <option value={2}>Chờ Lấy hàng</option>
                    <option value={3}>Đang giao</option>
                    <option value={4}>Đã giao</option>
                    <option value={5}>Đã hủy</option>
                </select>
                Ngày bắt đầu:
                <input
                    type="date"
                    className={styles.input_pickdate}
                    value={startDate}
                    onChange={(e) =>
                        setStartDate(e.target.value)}
                    placeholder="Ngày bắt đầu" />
                Ngày kết thúc:
                <input
                    type="date"
                    className={styles.input_pickdate}
                    value={endDate}
                    onChange={(e) =>
                        setEndDate(e.target.value)}
                    placeholder="Ngày kết thúc" />
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
                        <th>
                            Trạng thái đơn hàng
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
                                {parseInt(data.total).toLocaleString()}
                            </td>
                            <td>
                                {data.createAt.slice(11, 19)
                                    + " " + data.createAt.slice(0, 10)}
                            </td>
                            <td>
                                <select
                                    onChange={(event) => changeStatus(event.target.value, data._id)}
                                    value={data.status}>
                                    <option value={1}>Chờ xác nhận</option>
                                    <option value={2}>Chờ Lấy hàng</option>
                                    <option value={3}>Đang giao</option>
                                    <option value={4}>Đã giao</option>
                                    <option value={5}>Đã hủy</option>
                                </select>

                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>);
}

export default OrderManager;