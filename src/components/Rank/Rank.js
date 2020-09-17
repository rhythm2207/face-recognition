import React from 'react'
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div className='position'>
            <div className=' white f3 '>
                {`${name}, your entry count is :`}
            </div>
            <div className="f2 white">
                {entries}
            </div>
        </div>
    )
}

export default Rank