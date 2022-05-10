import React, {useState,memo, useEffect } from "react";
import style from '../../../CSS/HomePage/detailproduct.module.scss'
import clsx from 'clsx'

function ReviewProductCard({listImg}){
    
    const [image,setImage] = useState(listImg[0])
    let itemImage
    let lengthList
    useEffect(()=>{
        setImage(listImg[0])
    },[listImg])
    
    if(listImg){

        lengthList = listImg.length
        var length1,length2,length3,length4,length5 = false

        switch(lengthList){
            case 1:
                length1 =true
                break
            case 2:
                length2 =true
                break
            case 3:
                length3 =true
                break
            case 4:
                length4 =true
                break
            case 5:
                length5 =true
                break
            default:
                
                break
            }
            const classesImglist = clsx(style.img_load,{
                [style.length1]:length1,
                [style.length2]:length2,
                [style.length3]:length3,
                [style.length4]:length4,
                [style.length5]:length5,

            })
            itemImage = listImg.map((src,index) =>{
                return <img key={index} onMouseOver={()=> setImage(src)} src={src} alt="" className={classesImglist} />
            })
        
    }
    
    return <>
        <div className={style.center_image}>
            <div className={style.div_image_big}>
                <img src={image} alt="" className={style.img_big}/>
            </div>
            <div className={style.div_image_load}>
                {itemImage} 
            </div>
        </div>
    </>;
}

export default ReviewProductCard