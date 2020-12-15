import React from 'react'
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div className='position'>
            <div className=' white rank'>
                {`${name}, total images checked  : ${entries}`}
            </div>

        </div>
    )
}

export default Rank