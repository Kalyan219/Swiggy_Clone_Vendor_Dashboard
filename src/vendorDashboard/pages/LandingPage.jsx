import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] =useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken) {
      setShowLogout(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    if(firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const showLogoutHandler = () => {
    confirm('Are you sure you want to logout?') &&
    alert('Logout successfully');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogout(false);
    setShowFirmTitle(true);
    
  }

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }
  
  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showFirmHandler = () => {
    if(showLogout) {
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(true)
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Please login to add a firm');
      setShowLogin(true);
    }
    
  }

  const showProductHandler = () => {
    if(showLogout) {
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Please login to add a product');
      setShowLogin(true);
    }
    
  }

  const showWelcomeHandler = () => {
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  }

  const showAllProductsHandler = () => {
    if(showLogout) {
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    } else {
      alert('Please login to show all products');
      setShowLogin(true)
    }
    
  }

  return (
    <>
      <section className='landingSection'>
         <Navbar showLoginHandler = {showLoginHandler} 
         showRegisterHandler={showRegisterHandler}
         showLogout={showLogout}
         showLogoutHandler={showLogoutHandler} />
         <div className="collectionSection">
           <SideBar showFirmHandler={showFirmHandler} 
           showProductHandler = {showProductHandler} 
           showAllProductsHandler ={showAllProductsHandler}
           showFirmTitle = {showFirmTitle} />
           {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
           {showRegister && <Register showLoginHandler={showLoginHandler}/>}
           {showFirm && showLogout && <AddFirm />}
           {showProduct && showLogout && <AddProduct />}
           {showWelcome && <Welcome />}
           {showAllProducts && showLogout && <AllProducts />}
         </div>
      </section>
    </>
  )
}

export default LandingPage