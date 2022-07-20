import Registration from '../../components/registration/Registration';
import '../loginPage/LoginPage.scss'
import React, { useState } from 'react';
import '../../pages/startPage/StartPage.scss'
import startBackground from "../../images/startBackground.png";
import Spinner from '../../components/spinner/Spinner';

const RegistrationPage = () => {
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
                    <Registration></Registration>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;