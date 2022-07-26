import React from 'react';
import "./MainPage.scss";
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

const MainPage = () => {
  return (
    <div className='mainPage'>
        <Sidebar></Sidebar>
        <div className='mainPage__wrapper'>
            <Header></Header>
        </div>
    </div>
  )
}

export default MainPage