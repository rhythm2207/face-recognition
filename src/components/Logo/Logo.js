import React from 'react'
import Tilt from 'react-tilt'
import logo from './logo.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="size">
            <Tilt className="Tilt shadow-2 br-2" options={{ max: 55 }} style={{ height: 140, width: 140 }} >
                <div className="Tilt-inner ">
                    <img className='pa3' style={{ height: 90, width: 90 }} alt="logo" src={logo} />
                </div>
            </Tilt>
        </div>
    )
}
export default Logo