import React from "react"
import Link from "react-router-dom";
import "./FocusPin.css"

export default function FocusPin(props) {
    function openConfirm() {
        props.blur()
        document.getElementById("confirm").classList.add("confirm-window-show")
    }

    function closeConfirm() {
        document.getElementById("confirm").classList.remove("confirm-window-show")
    }

    return (
        <div className="pin-in-focus">
            <div className="image-and-tag">
                <div className="pin-image">
                    <img src={props.pinsInfo.image} />
                </div>
                <div className="tags" >
                    <h3>{props.pinsInfo.tags}</h3>
                </div>
            </div>
            <div className="info-side">
                <h1 className="title">{props.pinsInfo.title}</h1>
                <p>{props.pinsInfo.time}</p>
                <h2 className="location-and-rating">{props.pinsInfo.location}</h2>
                <div className="rating">
                    <h2 className="location-and-rating">{props.pinsInfo.rating}/10</h2>
                    <img src="../star.png" />
                </div>
                <div className="description">
                    <h1>{props.pinsInfo.description}</h1>
                </div>
                <div className="button-container"> 
                    <button 
                        className="remove-button"
                        onClick={() => openConfirm()}
                        >
                            Remove Pin
                    </button>
                    <div className="confirm-window" id="confirm">
                        <h1>Are you sure you want to remove pin?</h1>
                        <div className="yes-or-no">
                            <button className="cancel-button" onClick={() => closeConfirm()}>Cancel</button>
                            <button className="confirm-remove-button">Remove</button>
                            {/*TODO: make remove button actuallu remove*/}
                        </div>
                    </div>
                    <button className="edit-button">Edit Pin</button>
                </div>
            </div>
        </div>
    )
}