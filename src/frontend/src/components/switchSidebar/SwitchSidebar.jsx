import React, {useContext}  from 'react'
import './SwitchSidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContext } from '../../contexts/MainContext';


const SwitchSidebar = () => {
  const {sidebarState, toggleSidebarState} = useContext(MainContext);

  return (
    <button className='switchButton' onClick={toggleSidebarState} id={sidebarState}>
        <FontAwesomeIcon icon={sidebarState === 'active' ? faArrowLeft : faArrowRight}/>
    </button>
  )
}

export default SwitchSidebar