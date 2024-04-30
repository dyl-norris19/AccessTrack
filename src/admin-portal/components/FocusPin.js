import React from "react"
import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import "./FocusPin.css"
import {updatePin} from "../../database.js"

export default function FocusPin(props) {

    const [openRemove, setOpenRemove] = useState(false); 
    const closeModalRemove = () => setOpenRemove(false);

    const [openEdit, setOpenEdit] = useState(false); 
    const closeModalEdit = () => setOpenEdit(false);

    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedTags, setEditedTags] = useState("");

    useEffect(() => {
        setEditedTitle(props.pinsInfo.title);
        setEditedDescription(props.pinsInfo.description)
        setEditedTags(props.pinsInfo.tags)
    }, [props.pinsInfo])

    // Function to handle pin edit submission
    const handleEditSubmit = async () => {
        const updatedTitle = editedTitle !== undefined ? editedTitle : "";
        const updatedDescription = editedDescription !== undefined ? editedDescription : "";
        const updatedTags = editedTags !== undefined ? editedTags : "";
        
        const updatedPinData = {
            title: updatedTitle,
            description: updatedDescription,
            tags: updatedTags
            // Add more properties if needed
        };
    
        try {
            await updatePin(props.pinsInfo.id, updatedPinData);
            console.log("Pin updated successfully!");
            closeModalEdit();
        } catch (error) {
            console.error("Error updating pin:", error);
            // Handle error (e.g., show error message to the user)
        }

        props.updateFocus()
    };

    function getTimeDifference(timestampInSeconds) {
        // Convert timestamp to milliseconds
        const timestampInMilliseconds = timestampInSeconds * 1000;
        
        // Create Date objects for the current time and the pin's timestamp
        const currentTime = new Date();
        const pinTime = new Date(timestampInMilliseconds);
    
        // Calculate the difference in milliseconds between the current time and the pin's timestamp
        const differenceInMilliseconds = currentTime.getTime() - pinTime.getTime();
    
        // Convert difference to days
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
        // Determine the label based on the difference
        if (differenceInDays === 0) {
            return "a day ago";
        } else {
            return `${differenceInDays} days ago`;
        }
    }
    
    // Example usage
    const timestampInSeconds = props.pinsInfo.timestamp.seconds; // Assuming pins is an array of objects with a 'timestamp' property
    const timeDifference = getTimeDifference(timestampInSeconds);

    const avgQ = isNaN(props.avgQualityRating) ? "No Rating" : props.avgQualityRating
    const avgA = isNaN(props.avgAccuracyRating) ? "No Rating" : props.avgAccuracyRating

    return (
        <div className="pin-in-focus">
            <div className="image-and-tag">
                <div className="pin-image">
                    <img src={props.pinsInfo.Photo} alt="Pin Image" />
                </div>
                <div className="tags" >
                    <h3>{props.pinsInfo.tags}</h3>
                </div>
            </div>
            <div className="info-side">
                <h1 className="title">{props.pinsInfo.title}</h1>
                <p>{timeDifference}</p>
                <h2 className="location-and-rating">{props.pinsInfo.location._lat}, {props.pinsInfo.location._long}</h2>
                <div className="rating">
                    <div className="rating-item">
                        <h2 className="location-and-rating">Quality: {avgQ}{avgQ !== "No Rating" && "/10"}</h2>
                        {avgQ !== "No Rating" && <img src="../star.png" />}
                    </div>
                    <div className="rating-item">
                        <h2 className="location-and-rating">Accuracy: {avgA}{avgA !== "No Rating" && "/10"}</h2>
                        {avgA !== "No Rating" && <img src="../star.png" />}
                    </div>
                </div>
                <div className="description">
                    <h1>{props.pinsInfo.description}</h1>
                </div>
                <div className="button-container"> 
                    <button 
                        className="remove-button"
                        onClick={() => setOpenRemove(o => !o)}
                        >
                            Remove Pin
                    </button>
                    <Popup open={openRemove} onClose={closeModalRemove}>
                        <div className="confirm-window">
                            <h1>Are you sure you want to remove pin?</h1>
                            <div className="yes-or-no">
                                <button className="cancel-button" onClick={closeModalRemove}>Cancel</button>
                                <button className="confirm-remove-button" onClick={() => {
                                    props.removePin(props.pinsInfo.id)
                                    closeModalRemove()
                                    }
                                }>Remove</button>
                            </div>
                        </div>
                    </Popup>
                    <button 
                        className="edit-button"
                        onClick={() => setOpenEdit(o => !o)}
                        >
                            Edit Pin
                    </button>
                    <Popup open={openEdit} onClose={closeModalEdit}>
                        <div className="edit-pin-in-focus">
                            <h1>Edit Pin</h1>
                            <div className="form-container">
                                <div>
                                    <h3>Title</h3>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        placeholder="Title"
                                    />
                                </div>
                                <div>
                                    <h3>Description</h3>
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        placeholder="Description"
                                    />
                                </div>
                                <div>
                                    <h3>Tags</h3>
                                    <input
                                        type="text"
                                        value={editedTags}
                                        onChange={(e) => setEditedTags(e.target.value)}
                                        placeholder="Tags"
                                    />
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="edit-cancel" onClick={closeModalEdit}>Cancel</button>
                                <button className="edit-confirm" onClick={handleEditSubmit}>Submit Changes</button>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    )
}