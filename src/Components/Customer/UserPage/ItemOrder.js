import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import style from '../../../CSS/UserPage/itemorder.module.scss'
function ItemOrder({data}){
    const [detail,setDetail] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/api/iphone/'+data.id_product)
        .then(function (response) {
        // handle success
        console.log("first",response.data)
            setDetail(response.data)
        })
        .catch(function (error) {
        // handle error
            console.log(error);
        })
    },[data])
    console.log("data",data)
    return <>
        <div className={style.card_product_order}>
            <Row>
                <Col className={style.tag_img} lg={3}>
                    <img className={style.img_order} alt="" src={data.image} />
                </Col>
                <Col lg={9}>
                    <div className={style.name_product}>
                        {data.name}
                    </div>
                    <div className={style.description}>
                        Màu: {data.color}, Bộ nhớ trong: {data.memory}
                    </div>
                    <div className={style.description}>
                        Số lượng: {data.amount}
                    </div>
                    <div className={style.price_product}>
                       Giá: {data.price} VNĐ
                    </div>

                    
                    
                </Col>
            </Row>
        </div>
    </>
}
export default ItemOrder