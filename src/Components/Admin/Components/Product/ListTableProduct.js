import React ,{useState}from 'react';
import styles from '../../../../CSS/Admin/productmanager.module.scss'
import {RiDeleteBin7Fill} from 'react-icons/ri'
import {FaWrench} from 'react-icons/fa'
import clsx from 'clsx';
import ChangeProduct from './ChangeProduct';
import axios from 'axios';

function TBodyTable({data,index}) {
    const handleDeleteProduct = () =>{
        var check = window.confirm("Bạn có muốn xóa sản phẩm ",data.name," không ?")
        if(check){
            axios.post("http://localhost:3000/api/deleteProduct/",{id:data._id})
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
    const [changeProduct,setChangeProduct] = useState(false)
    return (<>
        <tr>
            <td className={styles.table_stt}>
                {index+1}
            </td>
            <td className={styles.table_img}>
                <div className={styles.tag_img_product}>
                <img className={styles.img_product} alt='' src={data.images[0]} />
                </div>
            </td>
            <td className={styles.table_name}>
                {data.name}
            </td>
            <td className={styles.table_detail}>
                <li className={styles.description_product}>Màn hình: {data.display}</li>
                <li className={styles.description_product}>RAM: {data.ram}</li>
                <li className={styles.description_product}>Chip: {data.chip}</li>
                <li className={styles.description_product}>Pin: {data.pin}</li>
                <li className={styles.description_product}>Lượt xem: {data.view}</li>
                <li className={styles.description_product}>Camera sau: {data.backcamera}</li>
                <li className={styles.description_product}>Camera trước:{data.frontcamera}</li>
                
            </td>
            <td className={styles.table_option}>
                <button onClick={()=>setChangeProduct(true)} 
                        className={clsx(styles.btn_fix,styles.btn_product)}>
                    <FaWrench />
                </button>

                    {changeProduct?<>
                        <button 
                            onClick={()=>setChangeProduct(!changeProduct)} 
                            className={styles.btn_hidden_add_product}>
                                X
                        </button>
                        <ChangeProduct id={data._id} key={data._id}/></>:null}
                <button onClick={()=>handleDeleteProduct()} className={clsx(styles.btn_remove,styles.btn_product)}>
                    <RiDeleteBin7Fill />
                </button>
            </td>
        </tr>
    </>)
}
function ListTableProduct({list}){
    console.log("list",list)
    return<>
        {list.map((data,index)=>{
                        return <TBodyTable 
                        key={index} 
                        data={data} 
                        index={index} />
                    })}
    </>
}
export default ListTableProduct;