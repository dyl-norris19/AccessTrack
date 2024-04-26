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

    return (
        <div className="pin-in-focus">
            <div className="image-and-tag">
                <div className="pin-image">
                    <img src={props.pinsInfo.Photo} alt="Pin Image"/>
                </div>
                <div className="tags" >
                    <h3>{props.pinsInfo.tags}</h3>
                </div>
            </div>
            <div className="info-side">
                <h1 className="title">{props.pinsInfo.title}</h1>
                <p>{props.pinsInfo.time}</p>
                <h2 className="location-and-rating">{props.pinsInfo.location._lat}, {props.pinsInfo.location._long}</h2>
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