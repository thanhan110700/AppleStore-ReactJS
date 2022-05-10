import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import style from '../../../CSS/HomePage/header.module.scss'
import { inputAmount, removeCart } from "../../../store/actions/cartActions";

function ItemCard({data}){
    const dispatch = useDispatch()
    const [amount,setAmount] = useState(data.amount)
    const handelOnchangeAmount = (e) =>{
        var eAmount = e.target.value
        if(eAmount<=0){
            eAmount = 0
        }
        setAmount(eAmount)
        dispatch(inputAmount({data:data,amount:eAmount}))
        
    }
    const handleClickRemove = () =>{
        dispatch(removeCart({data:data}))

    }
    return <>
        <div className={style.item_card}>
            <Container className={style.container}>
                <Row className={style.row}>
                    <Col lg={3} className={style.tag_img}>
                        <img className={style.img_cart} src={data.image} alt="" />
                    </Col>
                    <Col lg={8} className={style.tag_detail}>
                        <div className={style.name_product}>
                            {data.name}
                        </div>
                        <div className={style.price_product}>
                            Giá: {(data.price*amount).toLocaleString()} VNĐ
                        </div>
                        <div className={style.version_product}>
                            Màu: {data.color}, Phiên bản: {data.memory} 
                        </div>
                        <div className={style.version_product}>
                            Số lượng: 
                                <input type="number" value={data.amount} onChange={(e)=>handelOnchangeAmount(e)} className={style.input_amount}/>
                        </div>
                    </Col>
                    <Col lg={1} className={style.tag_btn}>
                        <button onClick={()=>handleClickRemove()} className={style.btn_remove}>
                            X
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default ItemCard