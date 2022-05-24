import React from "react";
import style from '../../../CSS/HomePage/iphonepage.module.scss'
export default function CardProduct({index,products}){
    return <>
        <div className={style.card_product}>
            <div className={style.image_product}>
                <img alt={index} src={products.images[0]} className={style.img_product} />
            </div>
            <div className={style.detail_product}>
                <p className={style.name_product}>{products.name}</p>
                <p className={style.price_product}>Giá: {parseInt(products.type[0].price).toLocaleString()} VNĐ</p>
                <ul className={style.tag_description_product}>
                    <li className={style.description_product}>Màn hình: {products.display}</li>
                    <li className={style.description_product}>RAM: {products.ram}</li>
                    <li className={style.description_product}>Chip: {products.chip}</li>
                    <li className={style.description_product}>Pin: {products.pin}</li>
                    <li className={style.description_product}>Lượt xem: {products.view}</li>
                </ul>
            </div>
        </div>
    </>
}