import React ,{useState} from "react";
import { Link } from "react-router-dom";
import style from '../../../CSS/HomePage/header.module.scss'
import { BiUserCircle,BiCartAlt } from "react-icons/bi";
import clsx from "clsx";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import DropdownUser from "./DropdownUser";
function HeaderHomepage(){
    const total_cart = useSelector(state=>state.cart.products)

    const [showHeaderRight,setShowHeaderRight] = useState(true)
    console.log("local token:" , localStorage.getItem('token'))
    return(
        <header>
            <div className={style.header_left}>
                <Link to="/"><span className={style.header_logo}>AppleStore</span></Link>
                
            </div>
            <div className={style.header_right}>
                <div className={style.left_right_header} id={showHeaderRight ? style.hidden_header_right : "" }>
                    <Link to="iphone" className={style.li_header_option}>iPhone</Link>
                    <Link to="ipad" className={style.li_header_option}>iPad</Link>
                    <Link to="iphone" className={style.li_header_option}>Watch</Link>
                    <Link to="ipad" className={style.li_header_option}>Macbook</Link>
                    <Link to="iphone" className={style.li_header_option}>AirPod</Link>
                    <Link to="ipad" className={style.li_header_option}>AirTag</Link>
                </div>
                <div className={style.right_right_header}>
                    <span className={style.cart_header} >
                        <div className={style.icon_cart}>
                            <BiCartAlt className={clsx(style.icon_right)}/>
                            {<div className={style.total_cart}>{total_cart.length}</div>}
                        </div>
                        <Cart />
                    </span>
                    <span className={style.account_header}>
                        <BiUserCircle className={clsx( style.icon_right)}/>
                        <DropdownUser />
                    </span>
                </div>
                <div className={style.btn_navbar}>
                    <button className={style.btn_threeLine} onClick={()=>{setShowHeaderRight(!showHeaderRight)}}>
                        <div className={style.bar1}></div>
                        <div className={style.bar2}></div>
                        <div className={style.bar3}></div>
                    </button>
                </div>
            </div>

        </header>
    );
};


export default HeaderHomepage;