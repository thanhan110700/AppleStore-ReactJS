import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import style from '../../../CSS/UserPage/userorder.module.scss'
import ListOrder from "../General/ListOrder";
function UserOrder() {
    const [chooseOption, setChooseOption] = useState("all")
    const [listAllOrder, setListAllOrder] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [a, seta] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3000/api/getOrderUser/' + localStorage.getItem('id_user'),
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )
            .then(function (response) {
                // handle success
                console.log("first", response.data)
                setListAllOrder(response.data)
                setListOrder(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [a])
    const handleChangeOption = (value) => {
        setChooseOption(value)
        if (value === "all") {
            setListOrder(listAllOrder)
        }
        if (value === "waitconfirm") {
            setListOrder(listAllOrder.filter((value) => {
                return value.status === 1
            }))
        }
        if (value === "waitpickup") {
            setListOrder(listAllOrder.filter((value) => {
                return value.status === 2
            }))
        }
        if (value === "delivery") {
            setListOrder(listAllOrder.filter((value) => {
                return value.status === 3
            }))
        }
        if (value === "delivered") {
            setListOrder(listAllOrder.filter((value) => {
                return value.status === 4
            }))
        }
        if (value === "cancelled") {
            setListOrder(listAllOrder.filter((value) => {
                return value.status === 5
            }))
        }
    }

    console.log("alo", listOrder)
    const handleCancelOrder = (id) => {
        console.log("alo")
        axios.post("http://localhost:3000/api/cancelOrder/", {
            id: id,
            token: localStorage.getItem("token")
        })
            .then((response) => {
                seta(a + 1)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    return <>
        <Container>
            <Row className={style.option}>
                <Col onClick={() => handleChangeOption("all")} className={clsx(style.tag_option, chooseOption === "all" ? style.tag_option_choose : "")} lg={2}>
                    <div>Tất cả</div>
                </Col>
                <Col onClick={() => handleChangeOption("waitconfirm")} className={clsx(style.tag_option, chooseOption === "waitconfirm" ? style.tag_option_choose : "")} lg={2}>
                    <div>Chờ xác nhận</div>
                </Col>
                <Col onClick={() => handleChangeOption("waitpickup")} className={clsx(style.tag_option, chooseOption === "waitpickup" ? style.tag_option_choose : "")} lg={2}>
                    <div>Chờ lấy hàng</div>
                </Col>
                <Col onClick={() => handleChangeOption("delivery")} className={clsx(style.tag_option, chooseOption === "delivery" ? style.tag_option_choose : "")} lg={2}>
                    <div>Đang giao</div>
                </Col>
                <Col onClick={() => handleChangeOption("delivered")} className={clsx(style.tag_option, chooseOption === "delivered" ? style.tag_option_choose : "")} lg={2}>
                    <div>Đã giao</div>
                </Col>
                <Col onClick={() => handleChangeOption("cancelled")} className={clsx(style.tag_option, chooseOption === "cancelled" ? style.tag_option_choose : "")} lg={2}>
                    <div>Đã hủy</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {chooseOption === "all" ? listOrder.map((data, index) => {
                        return <div key={index}>
                            <ListOrder value={data} />
                            <button onClick={() => handleCancelOrder(data._id)} className={style.btn_cancel}>
                                Hủy đơn hàng
                            </button>
                        </div>
                    }) : ""}
                    {chooseOption === "waitconfirm" ? listOrder.map((data, index) => {
                        return <div key={index}>
                            <ListOrder value={data} />
                            <button onClick={() => handleCancelOrder(data._id)} className={style.btn_cancel}>
                                Hủy đơn hàng
                            </button>
                        </div>
                    }) : ""}
                    {chooseOption === "waitpickup" ? listOrder.map((data, index) => {
                        return <div key={index}>
                            <ListOrder value={data} />
                            <button onClick={() => handleCancelOrder(data._id)} className={style.btn_cancel}>
                                Hủy đơn hàng
                            </button>
                        </div>
                    }) : ""}
                    {chooseOption === "delivery" ? listOrder.map((data, index) => {
                        return <div key={index}>
                            <ListOrder value={data} />
                            <button onClick={() => handleCancelOrder(data._id)} className={style.btn_cancel}>
                                Hủy đơn hàng
                            </button>
                        </div>
                    }) : ""}
                    {chooseOption === "delivered" ? listOrder.map((data, index) => {
                        return <div key={index}>
                            <ListOrder value={data} />
                            <button onClick={() => handleCancelOrder(data._id)} className={style.btn_cancel}>
                                Hủy đơn hàng
                            </button>
                        </div>
                    }) : ""}
                    {chooseOption === "cancelled" ? listOrder.map((data, index) => {
                        return <ListOrder value={data} key={index} />
                    }) : ""}
                </Col>
            </Row>
        </Container>
    </>
}

export default UserOrder