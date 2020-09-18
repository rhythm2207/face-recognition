import React from 'react'
import './ImageRecognition.css'

const ImageRecognition = ({ imageurl, box }) => {
    return (
        <div className='image-container' >
            <img id='inputImage' src={imageurl} alt="" width='700px' height='auto' />

            {box.map(element => (
                <div className="bounding-box" style={{ top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol }}>
                </div>
            ))
            }
        </div>
    )
}
export default ImageRecognition
