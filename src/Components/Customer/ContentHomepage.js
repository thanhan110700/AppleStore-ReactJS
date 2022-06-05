import React, { useEffect, useState } from "react";
import style from '../../CSS/HomePage/homepage.module.scss'
import style_card from '../../CSS/HomePage/iphonepage.module.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Row, Col, Container } from 'reactstrap';
import CardProduct from './General/CardProduct'
import { Link } from "react-router-dom";
import axios from "axios"


function CustomCarousel({ src }) {
    return <div>
        <img src={src} alt={src} className={style.img_slidershow} />
    </div>
}

export default function ContentHomePage() {
    const [featuredproductList, setList] = useState([])
    useEffect(() => {
        async function getData() {
            await axios.get('http://localhost:3000/api/iphone/getFeaturedProduct')
                .then(function (response) {
                    // handle success
                    console.log("alo", response)
                    setList(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        getData()
    }, [])

    const imgList = ["https://cdn.tgdd.vn/Files/2021/09/08/1381074/iphone_1280x720-800-resize.jpg",
        "https://thumbs.dreamstime.com/b/vinnytsia-ukraine-september-vector-banner-iphone-vector-illustration-app-web-presentation-design-vector-banner-iphone-230042240.jpg",
        "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-key-features-battery-202109_GEO_KR?wid=1300&hei=644&fmt=png-alpha&.v=1632358191000",
        "https://www.apple.com/v/iphone-13-pro/f/images/overview/camera/intro/camera_system__rp945vhdfsiu_large.png"]


    return (
        <>
            <div className={style.slideshow_container}>
                <Carousel
                    autoPlay={true}
                    showThumbs={false}
                    infiniteLoop={true}>
                    {imgList.map((src, index) => {
                        return <CustomCarousel src={src} key={index} />
                    })
                    }
                </Carousel>
            </div>
            <div className={style.intro1}>
                <div className={style.content_left1}>
                    <p>iPhone 13 Series,<br/> Your new superpower.</p>
                </div>
                <div className={style.content_right1}>
                    <img alt='' src='https://product.hstatic.net/200000348419/product/gia_iphone_13_pro_max_chinh_hang_590c8b9339ed42799e763fa5ca4c27ea_master.png'
                        className={style.img1} />
                </div>
            </div>
            <div className={style.title_featured_product}>
                <p>Điện thoại nổi bật</p>
            </div>
            <hr></hr>
            <div className={style.featured_products}>
                <Container>
                    <Row>
                        {featuredproductList.map((products, index) => {
                            return <Col key={index} xs={6} lg={3} className={style_card.col_card}>
                                <Link to={"/iphone/" + products._id} className={style_card.link_card}><CardProduct products={products} /></Link>
                            </Col>
                        })}
                    </Row>
                </Container>
            </div>
        </>
    );
}