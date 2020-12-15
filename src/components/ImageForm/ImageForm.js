import React from 'react'
import './ImageForm.css'
const ImageForm = ({ onInputChange, onButtonSubmit, handleUpload }) => {
    return (
        <div className="imageform">
            <p >
                This magic brain will detect faces in your pictures.
            </p>
            <div className="form">
                <div className="button-wrap">
                    <label htmlFor="upload" className="new-button">Upload Image</label>
                    <input type="file" id="upload" onChange={handleUpload} />
                </div>


                <input className="search-box" type="text" placeholder="Enter image URL" onChange={onInputChange} />
                <button className="button" onClick={onButtonSubmit}>Detect</button>
            </div>

        </div>
    )
}
export default ImageForm