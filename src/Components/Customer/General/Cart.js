import React from "react";
import { useSelector } from "react-redux";
import style from '../../../CSS/HomePage/header.module.scss'
import ItemCard from "./ItemCart";
import { Link } from "react-router-dom";
function Cart(){
    var listCart = useSelector(state => state.cart.products)
    var total = useSelector(state => state.cart.total)
    
    return <>
        <div className={style.cart}>
            {listCart.length !== 0 ? 
                <><div className={style.div_itemcard}>
                    {listCart.map((data,index)=>{
                    return <ItemCard key={index} data={data} />})}
                </div>
                    <div className={style.div_btn_payment}>
                        <span className={style.total}>Tổng tiền: {total.toLocaleString()} VNĐ</span>
                        <Link to={"/orderpage"} className={style.btn_payment}>Thanh toán</Link>
                    </div>
                </>:
                <>
                <div className={style.div_img_cartempty}>
                    <img alt="" src="https://ttpp.vietpharm.com.vn/theme_vimedimex/static/src/img/empty-cart.png" className={style.img_cart_empty}/>
                    <h4>Giỏ hàng trống</h4>
                </div>
            </>}
        </div>
    </>
}

export default Cart