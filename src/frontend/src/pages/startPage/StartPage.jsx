import React, { useState } from 'react';
import './StartPage.scss'
import { NavLink} from 'react-router-dom';
import startImage from "../../images/startImage.jpg";
import Spinner from '../../components/spinner/Spinner';
import ToggleThemeButton from '../../components/toggleThemeButton/ToggleThemeButton';
import Logo from '../../components/logo/Logo';

const StartPage = () => {
    const [loadingImage, setLoadingImage] = useState(false);

    const handleImageLoading = () => {
        setLoadingImage(false);
    }

    const spinner = loadingImage ? <Spinner/> : null;
    const content = !loadingImage ? <View startImage={startImage} handleImageLoading={handleImageLoading}/>: null;

    return (
        <>
            {spinner}
            {content}
        </>
    );
}

const View = ({startImage, handleImageLoading}) => {
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
                    <div className='startPage__content'>
                        <div className='startPage__content-field'>
                            <div className='startPage__content-desc'>
                                Discover the new learning app Langspeed. Learn new languages together with us and enjoy the knowledge you gain.
                            </div>
                            <div className="startPage__buttons">
                                <NavLink exact to="/login" className="startPage__buttons-item">Login</NavLink>
                                <NavLink exact to="/registration" className="startPage__buttons-item">Sign Up</NavLink>
                            </div>
                        </div>
                        <img src={startImage} className="startPage__content-image" alt="" onLoad={handleImageLoading}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartPage;