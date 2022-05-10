import React from "react";
import style from '../../../CSS/HomePage/footer.module.scss'
import { Link } from "react-router-dom";
function Footer(){
    return (<>
    <footer className={style.footer}>
        <div className={style.footer_left}>

            <h3 className={style.logo_name}>AppleStore</h3>

            <p className={style.footer_links}>
                <Link className={style.footer_links_components} to="/iphone">iPhone</Link>
                ·
                <Link className={style.footer_links_components} to="/ipad">iPad</Link>
                ·
                <Link className={style.footer_links_components} to="/">Mac</Link>
                ·
                <Link className={style.footer_links_components} to="/">Watch</Link>
            </p>

            <p className={style.footer_company_name}>Nocopyright AnStore © 2019</p>
        </div>
    </footer>

    </>);
}
export default Footer;