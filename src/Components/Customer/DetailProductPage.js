import React ,{useEffect, useMemo, useState} from "react";
import style from '../../CSS/HomePage/detailproduct.module.scss'
import { Row,Col,Container } from "reactstrap";
import {useParams} from 'react-router-dom'
import ReviewProductCard from "./General/ReviewProductCard";
import axios from "axios";
import clsx from "clsx";
import {useDispatch} from 'react-redux'
import { addCart } from "../../store/actions/cartActions";

function DetailProductPage(props){

    var [detail,setDetail] = useState([])
    var dispatch = useDispatch()
    const {id} = useParams()

    const [choosingMemory,setChoosingMemory] = useState('')
    const [choosingColor,setChoosingColor] = useState('')
    const [choosingPrice,setChoosingPrice] = useState(0)
    const [hiddenDescription,sethiddenDescription] = useState(true)
    const [listImg,setListImg] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/api/iphone/'+id)
            .then(function (response) {
            // handle success
            
                const data = response.data
                setChoosingColor(data.type[0].color[0])
                setChoosingMemory(data.type[0].memory)
                setChoosingPrice(data.type[0].price)
                setListImg(data.images)
                setDetail(data)
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
       
    },[])
    const OptionVersionColor = ({data}) => {
        return <>
            <span 
                onClick={()=>{
                    setChoosingColor(data)}} 
                style={choosingColor===data?{color: '#fffd91',border:'#fffd91 solid 1px'}:{}} 
                className={style.option_version}>
                    {data}
            </span>
            </>

    }
    const createMarkup = () => {
        return { __html: detail.description };
      }
    function  OptionVersionMemory({memory,price}){
        return <>
        <span 
                onClick={()=>{
                    
                    setChoosingPrice(price)
                    setChoosingMemory(memory)}} 
                style={choosingMemory===memory?{color: '#fffd91',border:'#fffd91 solid 1px'}:{}} 
                className={style.option_version}>
                    {memory}
            </span>
            </>

    }
    const handleAddCart = () =>{
        const newProduct = {
            id_product:id,
            name:detail.name,
            price:choosingPrice,
            memory:choosingMemory,
            image:detail.images[0],
            color:choosingColor,
            amount:1
        }
        dispatch(addCart(newProduct))
    }


    return <>
    <Container className={style.container_detail_product}>
        <Row>
            <Col lg={6} className={style.center_image}>
                <ReviewProductCard listImg={listImg}/>
            </Col>
            <Col lg={6} className={style.option_tag}>
                <p className={style.name_product_detail}>{detail.name}</p>
                <p className={style.price_product_detail}>Giá: {choosingPrice} VNĐ</p>
                <div className={style.margin_bottom_detail}>
                    {
                        detail.type && detail.type.map((t,index) => 
                            <OptionVersionMemory  key={index} memory={t.memory} price={t.price}/>)
                    }
                </div>
                <div className={style.margin_bottom_detail}>
                    {detail.type && detail.type[0].color.map((t,index) => 
                        <OptionVersionColor key={index} data={t} />
                    )}
        
                </div>
                <div className={clsx(style.margin_bottom_detail,style.navbottom)}>
                    <button className={clsx(style.btn_buy_product,style.btn_buyadd)}>Mua hàng</button>
                    <button className={clsx(style.btn_add_card,style.btn_buyadd)} onClick={()=>handleAddCart()}>Thêm vào giỏ</button>
                </div>
            </Col>
            
        </Row>
        <hr/>
        <Row  className={style.bottom_content}>
            <Col lg={7} className={style.description_tag}>
                <div className={style.title_description}><h2>Mô tả sản phẩm</h2></div>
                <div className={style.description}>
                    <div className={style.article}>
                        <div className={style.bg_article}  id={hiddenDescription?"":style.hidden}></div>
                        <div className={style.content_description} id={hiddenDescription?"":style.visibility_description}>
                            <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
                            
                        </div>
                    </div>
                    
                    <div className={style.tag_btn_more}>
                        <button onClick={()=>{sethiddenDescription(!hiddenDescription)}} className={style.btn_more}>{hiddenDescription?"Xem thêm":"Thu gọn"}</button>
                    </div>
                </div>
            </Col>
            <Col lg={5} className={style.detail_tag}>
                <div className={style.title_detail}><h2>Chi tiết sản phẩm</h2></div>
                <div className={style.content_detail}>
                    <table className={style.table_detail}>
                        <tbody>
                            <tr>
                                <td>Màn hình: </td>
                                <td>{detail.display}</td>
                            </tr>
                            <tr>
                                <td>Hệ điều hành: </td>
                                <td>{detail.os}</td>
                            </tr>
                            <tr>
                                <td>Camera sau: </td>
                                <td>{detail.backcamera}</td>
                            </tr>
                            <tr>
                                <td>Camera trước: </td>
                                <td>{detail.frontcamera}</td>
                            </tr>
                            <tr>
                                <td>Chip: </td>
                                <td>{detail.chip}</td>
                            </tr>
                            <tr>
                                <td>RAM: </td>
                                <td>{detail.ram}</td>
                            </tr>
                            <tr>
                                <td>Bộ nhớ trong: </td>
                                <td>{choosingMemory }</td>
                            </tr>
                            <tr>
                                <td>Sim: </td>
                                <td>{detail.sim}</td>
                            </tr>
                            <tr>
                                <td>Pin, sạc: </td>
                                <td>{detail.pin}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    </Container>
    </>
}


export default DetailProductPage