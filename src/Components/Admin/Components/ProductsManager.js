import clsx from 'clsx';
import React, { useState } from 'react';
import styles from '../../../CSS/Admin/productmanager.module.scss'
import IphoneAdmin from './Product/Iphone';
function ProductManager() {
    const [optionProduct, setOptionProduct] = useState(0)
    return (
        <>
            <div className={styles.tag_option_product}>
                <div
                    onClick={() => setOptionProduct(0)}
                    className={clsx(styles.option_product, optionProduct === 0 ? styles.active_product : '')}>
                    iPhone
                </div>
                <div
                    onClick={() => setOptionProduct(1)}
                    className={clsx(styles.option_product, optionProduct === 1 ? styles.active_product : '')}>
                    iPad
                </div>
                <div
                    onClick={() => setOptionProduct(2)}
                    className={clsx(styles.option_product, optionProduct === 2 ? styles.active_product : '')}>
                    Macbook
                </div>
            </div>
            <div className={styles.tag_product}>
                {optionProduct === 0 ? <IphoneAdmin /> : ''}

            </div>
        </>);
}

export default ProductManager;