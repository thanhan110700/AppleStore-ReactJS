import React ,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import styles from '../../CSS/HomePage/orderpage.module.scss'
import ItemCard from './General/ItemCart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function OrderPage() {
    var navigate = useNavigate()
    var listProduct = useSelector(state => state.cart.products)
    var total = useSelector(state => state.cart.total)
    var [address,setAddress] = useState("")
    var [statusChangeAddress,setStatusChangeAddress] = useState("")
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(token==null){
            setAddress("Bạn chưa đăng nhập, Đăng nhập để thanh toán")
        }
        else{
            axios.get('http://localhost:3000/api/getUser/'
                        +localStorage.getItem('id_user'),
                        {
                            headers:{
                                token:localStorage.getItem('token')
                            }
                        }
        )
            .then(function (response) {
            // handle success
                console.log("first")
                setAddress(response.data.address)
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
        }
        
    },[])
    const handelChangeAddress = () =>{
        axios.post('http://localhost:3000/api/changeAddress'
                ,{
                    id:localStorage.getItem('id_user'),
                    address:address,
                    token:localStorage.getItem('token')
                }
            )
            .then(function (response) {
            // handle success
            
                setStatusChangeAddress("Thay đổi địa chỉ thành công")
            })
            .catch(function (error) {
            // handle error
                setStatusChangeAddress("Thay đổi địa chỉ thất bại, đã xảy ra vấn đề!")
            })
    }
    const handleActionOrder = () =>{
        axios.post('http://localhost:3000/api/addOrder'
                ,{
                    idUser:localStorage.getItem('id_user'),
                    total:total,
                    detail:listProduct,
                    status:1,
                    token:localStorage.getItem('token')
                    
                }
            )
            .then(function (response) {
            // handle success
                console.log("first",response.data)
                navigate("/doneorderpage")

            })
            .catch(function (error) {
            // handle error
                setStatusChangeAddress("Đặt hàng thất bại, xảy ra vấn đề!")
            })
    }
    return ( <>
        <div className={styles.container_orderpage}>
            <div className={styles.div_form_order}>
                <div className={styles.div_list_product}>
                    {
                        listProduct.map((data,index)=>{
                            return<ItemCard key={index} data={data} />
                        })
                    }
                </div>
                <div className={styles.div_option}>
                    <div>
                        <p>{statusChangeAddress}</p>
                        <span>Địa chỉ nhận hàng:</span>
                        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} className={styles.input_address}/>
                        <button className={styles.btn_change_address} onClick={()=>handelChangeAddress()}>Sửa</button>
                    </div>
                    <span className={styles.total}>Tổng tiền: {total.toLocaleString()} VNĐ</span>
                    <div className={styles.div_btn_order}>
                        <button className={styles.btn_order} onClick={()=>handleActionOrder()}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>  
    </> );
}

export default OrderPage;