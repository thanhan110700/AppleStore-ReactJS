import React,{useState} from 'react';
import {TiDeleteOutline} from 'react-icons/ti'
import {Container, Row, Col} from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from '../../../../CSS/Admin/productmanager.module.scss'
import {RiAddCircleLine} from 'react-icons/ri'
import clsx from 'clsx';
import axios from 'axios';
function AddProduct() {
    
    const [name,setName] = useState("") 
    const [display,setDisplay] = useState("")
    const [os,setOs] = useState("")
    const [chip,setChip] = useState("")
    const [frontCamera,setFrontCamera] = useState("")
    const [backCamera,setBackCamera] = useState("")
    const [ram,setRam] = useState("")
    const [sim,setSim] = useState("")
    const [pin,setPin] = useState("")
    const [color,setColor] = useState("")
    const [listColor,setListColor] = useState([])
    const [memory,setMemory] = useState("")
    const [price,setPrice] = useState("")
    const [listType,setListType] = useState([])
    const [image,setImage] = useState("")
    const [listImage,setListImage] = useState([])
    const [description,setDescription] = useState("")


    const handleBtnAddProduct = () =>{
        const type = [

        ]
        listType.map((data)=>
           type.push({color:listColor,memory:data.memory,price:data.price})
        )
        console.log(type)
        axios.post("http://localhost:3000/api/addproduct/",{name,display,os,chip,frontcamera:frontCamera,backcamera:backCamera,ram,sim,pin,type:type,images:listImage,description,view:0,sale:100,token:localStorage.getItem('token ')})
        .then(function (response){
            console.log("update ok")
            setName("")
            setDisplay("")
            setOs("")
            setChip("")
            setFrontCamera("")
            setBackCamera("")
            setRam("")
            setSim("")
            setPin("")
            setListColor([])
            setListType([])
            setListImage([])
            setDescription("")
        })
        .catch(function (error){
            console.log("lỗi")
        })
        
    }

    return (<>
    <div className={styles.tag_container_add_product}>
        <div  className={styles.tag_add_product}>
            <p className={styles.txt_add_title}>Thêm sản phẩm</p>
            <Container className={styles.container_add_product}>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Tên sản phẩm:</label>&nbsp;
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Màn hình:</label>&nbsp;
                        <input value={display} onChange={(e)=>{setDisplay(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Hệ điều hành:</label>&nbsp;
                        <input value={os} onChange={(e)=>{setOs(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Chip:</label>&nbsp;
                        <input value={chip} onChange={(e)=>{setChip(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Camera trước:</label>&nbsp;
                        <input value={frontCamera} onChange={(e)=>{setFrontCamera(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Camera sau:</label>&nbsp;
                        <input value={backCamera} onChange={(e)=>{setBackCamera(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Ram:</label>&nbsp;
                        <input value={ram} onChange={(e)=>{setRam(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Sim:</label>&nbsp;
                        <input value={sim} onChange={(e)=>{setSim(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={6}>
                        <label className={styles.lbl_add_product}>Pin:</label>&nbsp;
                        <input value={pin} onChange={(e)=>{setPin(e.target.value)}} type="text" className={styles.input_add_product}/>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col lg={4}>
                                <label className={styles.lbl_add_product}>Color:</label>&nbsp;
                            </Col>
                            <Col lg={8}>
                                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className={clsx(styles.input_add_color_product,styles.input_add_product)}/>&nbsp;&nbsp;
                                <RiAddCircleLine 
                                    className={styles.icon_add_remove}
                                    onClick={()=>{
                                        setListColor([...listColor,color])
                                        setColor('')}}/>
                                {listColor.map((data,index) =>{
                                    return <div key={index}>
                                        <span>{data}</span>&nbsp;&nbsp;
                                        <TiDeleteOutline 
                                            className={styles.icon_add_remove}
                                            onClick={()=>{
                                                setListColor(listColor.filter(e => {return e!== data}))
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
                        <input value={image} onChange={(e)=>{setImage(e.target.value)}} type="text" className={styles.input_add_product}/> &nbsp;&nbsp;
                        <RiAddCircleLine 
                            className={styles.icon_add_remove}
                            onClick={()=>{
                                setListImage([...listImage,image])
                                setImage('')
                                }}  />
                        <div className={styles.margin_top}>
                        {listImage.map((data,index) =>{
                                    return <div key={index} className={styles.tag_list_img}>
                                        <img src={data} alt='' className={styles.list_img}  />&nbsp;
                                        <TiDeleteOutline 
                                            className={styles.icon_add_remove}
                                            onClick={()=>{
                                                setListImage(listImage.filter(e => {return e!== data}))
                                        }} />
                                    </div>
                                })}
                        </div>
                    </Col>
                </Row>
                <Row className={styles.row_add_product}>
                    <Col lg={4}>
                        <label >Type (Bộ nhớ trong, Giá):</label>&nbsp;
                        
                    </Col>
                    <Col lg={8}>
                        <input value={memory} placeholder="Bộ nhớ trong" onChange={(e)=>{setMemory(e.target.value)}} type="text" className={clsx(styles.input_add_product,styles.input_add_type_product)}/>
                        <input value={price} placeholder="Giá" onChange={(e)=>{setPrice(e.target.value)}} type="text" className={clsx(styles.input_add_product,styles.input_add_type_product)}/>
                        <RiAddCircleLine 
                            className={styles.icon_add_remove}
                            onClick={()=>{
                                setListType([...listType,{memory,price}])
                                setMemory('')
                                setPrice('')
                                }}  />
                        {listType.map((data,index) =>{
                            return <div key={index}>
                                <span>[{data.memory},{data.price}]</span>
                                <TiDeleteOutline 
                                    className={styles.icon_add_remove}
                                    onClick={()=>{
                                        setListType(listType.filter(e => {return e.memory!== data.price && e.price !== data.price}))
                                }} />
                            </div>
                        })}
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
                            data={description} 
                            onChange={(e,editor)=>{setDescription(editor.getData())}} />

                    </Col>
                </Row>
            </Container>
        <div>
            <button 
                onClick={()=>handleBtnAddProduct()} 
                className={styles.btn_add_product}>Thêm sản phẩm</button>
        </div>
        </div>
    </div>
    </>);
}

export default AddProduct;