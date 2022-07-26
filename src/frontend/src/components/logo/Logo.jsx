import React from 'react'
import { NavLink} from 'react-router-dom';
import './Logo.scss'

const Logo = () => {
  return (
    <NavLink exact to="/" className='logo'>
        <div className='logo__field'>
            <p className='logo__title'>
                Langspeed
            </p>
        </div>
    </NavLink>
  )
}

export default Logo