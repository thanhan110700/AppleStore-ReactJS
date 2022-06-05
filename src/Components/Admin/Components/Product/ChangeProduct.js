import React,{useEffect, useState,memo} from 'react';
import {TiDeleteOutline} from 'react-icons/ti'
import {Container, Row, Col} from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from '../../../../CSS/Admin/productmanager.module.scss'
import {RiAddCircleLine} from 'react-icons/ri'
import clsx from 'clsx';
import axios from 'axios';
function ChangeProduct({id}) {
    const [description,setDescription] = useState("")
    const [dataProduct,setDataProduct] = useState({})

    useEffect(()=>{
        axios.get('http://localhost:3000/api/iphone/'+id)
        .then(function (response) {
            // handle success
                const data = response.data
                console.log(data)
                setDescription(data.description)
                setDataProduct({
                    name:data.name,
                    display:data.display,
                    os:data.os,
                    chip:data.chip,
                    frontcamera:data.frontcamera,
                    backcamera:data.backcamera,
                    ram:data.ram,
                    sim:data.sim,
                    pin:data.pin,
                    listColor:data.type[0].color,
                    listType:data.type,
                    images:data.images,
                    description:description,
                })
            })
    },[])

    const handleBtnChangeProduct = () =>{
        const type = dataProduct.listType
        type.map(data =>{
            return data.color = dataProduct.listColor
        })
        axios.post("http://localhost:3000/api/changeProduct/",{
            id:id,
            name:dataProduct.name,
            display:dataProduct.display,
            os:dataProduct.os,
            chip:dataProduct.chip,
            frontcamera:dataProduct.frontcamera,
            backcamera:dataProduct.backcamera,
            ram:dataProduct.ram,
            sim:dataProduct.sim,
            pin:dataProduct.pin,
            type:type,
            images:dataProduct.listImage,
            description:description,
            token:localStorage.getItem("token")})
        .then(function (response){
            console.log("update ok")       
        })
        .catch(function (error){
            console.log("lỗi",error)
        })
        
    }
    console.log(dataProduct.listColor);
    return (<>
    <div className={styles.tag_container_add_product}>
        <div  className={styles.tag_add_product}>
            <p className={styles.txt_add_title}>Sửa sản phẩm</p>
            <Container className={styles.container_add_product}>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Tên sản phẩm:</label>&nbsp;
                        <input value={dataProduct.name} onChange={(e)=>{setDataProduct({...dataProduct,name:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Màn hình:</label>&nbsp;
                        <input value={dataProduct.display} onChange={(e)=>{setDataProduct({...dataProduct,display:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Hệ điều hành:</label>&nbsp;
                        <input value={dataProduct.os} onChange={(e)=>{setDataProduct({...dataProduct,os:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Chip:</label>&nbsp;
                        <input value={dataProduct.chip} onChange={(e)=>{setDataProduct({...dataProduct,chip:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Camera trước:</label>&nbsp;
                        <input value={dataProduct.frontcamera} onChange={(e)=>{setDataProduct({...dataProduct,frontcamera:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Camera sau:</label>&nbsp;
                        <input value={dataProduct.backcamera} onChange={(e)=>{setDataProduct({...dataProduct,backcamera:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Ram:</label>&nbsp;
                        <input value={dataProduct.ram} onChange={(e)=>{setDataProduct({...dataProduct,ram:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Sim:</label>&nbsp;
                        <input value={dataProduct.sim} onChange={(e)=>{setDataProduct({...dataProduct,sim:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Pin:</label>&nbsp;
                        <input value={dataProduct.pin} onChange={(e)=>{setDataProduct({...dataProduct,pin:e.target.value})}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col lg={4}>
                                <label className={styles.lbl_add_product}>Color:</label>&nbsp;
                            </Col>
                            <Col lg={8}>
                                <input type="text" value={dataProduct.color} onChange={(e) => setDataProduct({...dataProduct,color:e.target.value})} className={clsx(styles.input_add_color_product,styles.input_add_product)}/>&nbsp;&nbsp;
                                <RiAddCircleLine 
                                    className={styles.icon_add_remove}
                                    onClick={()=>{
                                        setDataProduct({...dataProduct,listColor:dataProduct.listColor.push(dataProduct.color)})
                                        setDataProduct({...dataProduct,color:""})}}/>
                                {dataProduct.listColor && dataProduct.listColor.map((data,index) =>{
                                    return <div key={index}>
                                            <span>{data}</span>&nbsp;&nbsp;
                                            <TiDeleteOutline 
                                                className={styles.icon_add_remove}
                                                onClick={()=>{
                                                    setDataProduct({...dataProduct,listColor:dataProduct.listColor.filter(e => {return e!== data})})
                                            }} />
                                        </div>
                                })}
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={4}>
                        <label>Danh sách hình ảnh (URL):</label>&nbsp;     
                    </Col>
                    <Col lg={8}>
                        <input value={dataProduct.image} onChange={(e)=>{setDataProduct({...dataProduct,image:e.target.value})}} type="text" className={styles.input_add_product}/> &nbsp;&nbsp;
                        <RiAddCircleLine 
                            className={styles.icon_add_remove}
                            onClick={()=>{
                                    setDataProduct({...dataProduct,images:[...dataProduct.images,dataProduct.image]})
                                    setDataProduct({...dataProduct,image:''})
                                }}  />
                        <div className={styles.margin_top}>
                            {dataProduct.images && dataProduct.images.map((data,index) =>{
                                return ( 
                                    <div key={index} className={styles.tag_list_img}>
                                        <img src={data} alt='' className={styles.list_img}  />&nbsp;
                                        <TiDeleteOutline
                                            className={styles.icon_add_remove}
                                            onClick={()=>{
                                            setDataProduct({
                                                ...dataProduct,
                                                images:dataProduct.images.filter(e => {
                                                    return e!== data
                                                    })
                                                })
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={4}>
                        <label >Type (Bộ nhớ trong, Giá):</label>&nbsp;
                    </Col>
                    <Col lg={8}>
                        <input 
                            value={dataProduct.memory} 
                            placeholder="Bộ nhớ trong" 
                            onChange={(e)=>{setDataProduct({...dataProduct,memory:e.target.value})}} 
                            type="text" 
                            className={
                                clsx(styles.input_add_product,styles.input_add_type_product)}/>
                        <input 
                            value={dataProduct.price} 
                            placeholder="Giá" 
                            onChange={(e)=>{setDataProduct({...dataProduct,price:e.target.value})}} 
                            type="text" 
                            className={
                                clsx(styles.input_add_product,styles.input_add_type_product)}/>
                        <RiAddCircleLine
                            className={styles.icon_add_remove}
                            onClick={()=>{
                                setDataProduct({...dataProduct,listType:[...dataProduct.listType,{memory:dataProduct.memory,price:dataProduct.price}]})
                                setDataProduct({...dataProduct,memory:''})
                                setDataProduct({...dataProduct,price:''})}}/>
                        <div>
                        {dataProduct.listType && dataProduct.listType.map((data,index) =>{
                            return <div key={index}>
                                <span>[{data.memory},{data.price}]</span>
                                <TiDeleteOutline
                                    className={styles.icon_add_remove}
                                    key={index} 
                                    onClick={()=>{
                                        setDataProduct({...dataProduct,listType:dataProduct.listType.filter(e => {return e.memory!== data.price && e.price !== data.price})})}}
                                />
                            </div>
                        })}
                        </div>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={12}>
                        <label >Thêm mô tả:</label>&nbsp;
                    </Col>
                    <Col lg={12}>
                        <CKEditor 
                            className={styles.ckeditor} 
                            editor={ClassicEditor} 
                            data= {description}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData()
                                setDescription(data)
                            } } />
                    </Col>
                </Row>
            </Container>
        <div>
            <button 
                onClick={()=>handleBtnChangeProduct()} 
                className={styles.btn_add_product}>Sửa sản phẩm</button>
        </div>
        </div>
    </div>
    </>);
}

export default memo(ChangeProduct);