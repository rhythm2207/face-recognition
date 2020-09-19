import React from 'react'
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div className='position'>
            <div className=' white rank'>
                {`${name}, your entry count is :`}
            </div>
            <div className="entry white">
                {entries}
            </div>
        </div>
    )
}

export default Rank