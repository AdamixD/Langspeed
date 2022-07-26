import React, {useContext} from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import SwitchSidebar from '../switchSidebar/SwitchSidebar';
import { MainContext } from '../../contexts/MainContext';


const Sidebar = () => {
  const {sidebarState} = useContext(MainContext);

  return (
    <>{
        sidebarState === "active"
        ?   <div className='sidebar'>
                <SwitchSidebar></SwitchSidebar>
                <div className='sidebar__container'>
                    <button className='sidebar__button'>Start</button>
                    <button className='sidebar__button'>Foldery</button>
                    <button className='sidebar__button'>Zestawy</button>
                    <button className='sidebar__button'>Twoje Postępy</button>
                    <button className='sidebar__logout-active'>Wyloguj</button>
                </div>
            </div>
        :   <div className='sidebar__disabled'>
                <SwitchSidebar></SwitchSidebar>
                <button className='sidebar__logout-disabled'>
                    <FontAwesomeIcon icon={faRightFromBracket}/>
                </button>
            </div>
    }</>
  )
}

export default Sidebar