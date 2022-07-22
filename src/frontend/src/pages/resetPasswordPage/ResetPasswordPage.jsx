import ResetPassword from '../../components/resetPassword/ResetPassword';
import '../loginPage/LoginPage.scss'
import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import '../../pages/startPage/StartPage.scss'

const ResetPasswordPage = () => {
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
                    <NavLink exact to="/" className='startPage__logo'>
                        <div className='startPage__logo-field'>
                            <p className='startPage__logo-title'>
                                Langspeed
                            </p>
                        </div>
                    </NavLink>
                </div>
                <div className="startPage__wrapper-item">
                    <div className="startPage__login">
                        <ResetPassword></ResetPassword>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;