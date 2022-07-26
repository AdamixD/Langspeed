import Login from "../../components/login/Login"
import './LoginPage.scss'
import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import '../../pages/startPage/StartPage.scss'
import ToggleThemeButton from '../../components/toggleThemeButton/ToggleThemeButton';
import Logo from "../../components/logo/Logo";

const LoginPage = () => {
    const content = <View/>;

    return (
        <>
            {content}
        </>
    );
}

const View = () => {
    return(
        <div className="startPage">
            <div className="startPage__wrapper">
                <div className="startPage__wrapper-item">
                    <div className="startPage__navbar">
                        <Logo></Logo>
                        <ToggleThemeButton></ToggleThemeButton>
                    </div>
                </div>
                <div className="startPage__wrapper-item">
                    <div className="startPage__login">
                        <Login></Login>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;