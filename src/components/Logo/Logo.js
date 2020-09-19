import React from 'react'
import Tilt from 'react-tilt'
import logo from './logo.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="size">
            <Tilt className="Tilt shadow-2 br-2 logo" options={{ max: 55 }} >
                <div className="Tilt-inner ">
                    <img className="pic" style={{ height: 90, width: 90 }} alt="logo" src={logo} />
                </div>
            </Tilt>
        </div>
    )
}
export default Logo