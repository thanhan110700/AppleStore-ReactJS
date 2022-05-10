import React,{ useEffect, useState } from "react";
import style from '../../CSS/HomePage/iphonepage.module.scss'
import CardProduct from './General/CardProduct'
import axios from 'axios'
import { Row,Col, Container } from 'reactstrap';
import { Link } from "react-router-dom";


function IphonePage(){
    const [featuredproductList,setList] = useState([])

    useEffect(()=>{
        async function getData(){
            await axios.get('http://localhost:3000/api/iphone/')
            .then(function (response) {
            // handle success
                setList(response.data)
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
        } 
        getData()
    },[])
    console.log(featuredproductList)
            
    return (<>
        <Container>
            <Row>
                {featuredproductList.map((products,index) => {
                return <Col key={index} xs={6} lg={3} className={style.col_card}>
                    <Link to={"/iphone/"+products._id} className={style.link_card}><CardProduct  products={products}  /></Link>
                    </Col>})}
            </Row>
        </Container>            


    </>)
}

export default IphonePage