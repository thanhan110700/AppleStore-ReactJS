import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import HeaderHomepage from './Components/Customer/General/HeaderHomepage.js'
import Footer from './Components/Customer/General/Footer.js'
import ContentHomePage from './Components/Customer/ContentHomepage.js'
import IphonePage from './Components/Customer/IphonePage'
import DetailProductPage from './Components/Customer/DetailProductPage.js';
import style from './CSS/HomePage/header.module.scss'
import Login from './Components/Customer/Login.js';
import ButtonOnTop from './Components/Customer/General/ButtonOnTop.js';
import Register from './Components/Customer/Register.js';
import UserPage from './Components/Customer/UserPage.js';
import OrderPage from './Components/Customer/OrderPage.js';
import DoneOrderPage from './Components/Customer/General/DoneOrderPage.js';

function App() {
  
  return (<>
    <HeaderHomepage />
    <div className={style.content_page}>
      <Routes>
          <Route path="/iphone" element={<IphonePage/>} />
          <Route path="/iphone/:id" element={<DetailProductPage/>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/orderpage" element={<OrderPage />} />
          <Route path="/doneorderpage" element={<DoneOrderPage />} />
          <Route path="/" element={<ContentHomePage/>} />
      </Routes>
      <ButtonOnTop />
    </div>
    <Footer/>
  </>);
}

export default App;
