import React, {useContext} from 'react'
import "./ToggleThemeButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun} from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleThemeButton = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  console.log(theme);

  return (
    <button className='toggleButton' onClick={toggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} id='sun'/>
    </button>
  )
}

export default ToggleThemeButton