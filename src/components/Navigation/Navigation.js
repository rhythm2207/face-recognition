import React from 'react'
import './Navigation.css'
const Navigation = ({ onRouteChange }) => {
    return (
        <nav>
            <p onClick={() => onRouteChange('signin')} className=' custom fs link dim black  pointer'>Sign Out</p>
        </nav>
    )
}

export default Navigation