import React from 'react'
import './ImageRecognition.css'

const ImageRecognition = ({ imageurl, box, ageList, genderList }) => {
    return (
        <div className='image-container' >
            <img id='inputImage' src={imageurl} alt="" width='700px' height='auto' />

            {box.map(element => (
                <div key={element.topRow} className="bounding-box" style={{ top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol }}>
                </div>))
            }
        </div>
    )
}
export default ImageRecognition
