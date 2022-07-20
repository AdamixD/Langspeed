import Login from "../../components/login/Login"
import './LoginPage.scss'
import React, { useState } from 'react';
import '../../pages/startPage/StartPage.scss'
import startBackground from "../../images/startBackground.png";
import Spinner from '../../components/spinner/Spinner';

const LoginPage = () => {
    const [loadingBackground, setLoadingBackground] = useState(false);

    const handleBackgroundLoading = () => {
        setLoadingBackground(false);
    }

    const spinner = loadingBackground ? <Spinner/> : null;
    const content =  !loadingBackground ? <View startBackground={startBackground} handleBackgroundLoading={handleBackgroundLoading}/>: null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
}

const View = ({startBackground, handleBackgroundLoading}) => {
    return(
        <div className="startPage">
            <img src={startBackground} className="startPage__background" alt="" onLoad={handleBackgroundLoading}/>
            <div className="startPage__wrapper">
                <div className='startPage__logo'>
                    <div className='startPage__logo-field'>
                        <p className='startPage__logo-title'>
                            Langspeed
                        </p>
                    </div>
                </div>
                <div className="startPage__login">
                    <Login></Login>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;