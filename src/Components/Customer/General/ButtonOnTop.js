import clsx from "clsx";
import React,{useEffect,useState} from "react";
import style from '../../../CSS/HomePage/buttonontop.module.scss'
import {BiCaretUp } from "react-icons/bi";
function ButtonOnTop(){
    const [show,setShow] = useState(false)
    const handleScroll = () => {
        const position = window.pageYOffset;
        
        if(position>200){
            setShow(true)
        }
        if(position<200){
            setShow(false)
        }
      };
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    },[])
    return <div title="Lên đầu trang" className={clsx(style.btn_on_top, show ? style.showBtn : "")} onClick={()=>{window.scrollTo(0, 0)   }}>
        <BiCaretUp className={style.icon_up}/>
    </div>
}
export default ButtonOnTop;