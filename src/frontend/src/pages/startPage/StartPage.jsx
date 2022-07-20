import React, { useState } from 'react';
import './StartPage.scss'
import { NavLink} from 'react-router-dom';
import startImage from "../../images/startImage.jpg";
import startBackground from "../../images/startBackground.png";
import Spinner from '../../components/spinner/Spinner';

const StartPage = () => {
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingBackground, setLoadingBackground] = useState(false);

    const handleBackgroundLoading = () => {
        setLoadingBackground(false);
    }

    const handleImageLoading = () => {
        setLoadingImage(false);
    }

    const spinner = (loadingImage && loadingBackground) ? <Spinner/> : null;
    const content = !(loadingImage && loadingBackground) ? <View startImage={startImage} startBackground={startBackground} handleImageLoading={handleImageLoading} handleBackgroundLoading={handleBackgroundLoading}/>: null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
}

const View = ({startImage, startBackground, handleImageLoading, handleBackgroundLoading}) => {
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
                <div className='startPage__content'>
                    <div className='startPage__content-field'>
                        <div className='startPage__content-desc'>
                            Discover the new learning app Langspeed. Learn new languages together with us and enjoy the knowledge you gain.                    
                        </div>
                        <div className="startPage__buttons">
                            <NavLink exact className="startPage__buttons-item" to="/login">Login</NavLink>
                            <NavLink exact className="startPage__buttons-item"  to="/registration">SignUp</NavLink>
                        </div>
                    </div>
                    <img src={startImage} className="startPage__content-image" alt="" onLoad={handleImageLoading}/>
                </div>
            </div>
        </div>
    )
}

export default StartPage;