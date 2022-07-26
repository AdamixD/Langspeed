import React from 'react';
import "./Header.scss";
import Logo from '../logo/Logo';
import ToggleThemeButton from '../toggleThemeButton/ToggleThemeButton';


const Header = () => {
  return (
    <div className='header'>
        <Logo></Logo>
        <div className='header__wrapper'>
            <div className='header__profile'>
                <div className='header__profile-image'></div>
                <div className='header__profile-name'>Adam Dąbkowski</div>
            </div>
            <ToggleThemeButton></ToggleThemeButton>
        </div>
    </div>
  )
}

export default Header