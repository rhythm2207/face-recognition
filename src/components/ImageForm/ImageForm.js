import React from 'react'
import './ImageForm.css'
const ImageForm = ({ onInputChange, onButtonSubmit, handleUpload }) => {
    return (
        <div>
            <p >
                This magic brain will detect faces in your pictures . Give it a try .
            </p>
            <div>
                <input type="file" onChange={handleUpload} />
                <input className="search-box" type="text" placeholder="Enter image URL" onChange={onInputChange} />
                <button className="button" onClick={onButtonSubmit}>Detect</button>
            </div>

        </div>
    )
}
export default ImageForm