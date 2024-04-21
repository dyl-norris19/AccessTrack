import React from "react"
import Link from "react-router-dom";
import "./FocusPin.css"
import { useState } from 'react';
import Popup from 'reactjs-popup';

export default function FocusPin(props) {

    const [openRemove, setOpenRemove] = useState(false); 
    const closeModalRemove = () => setOpenRemove(false);

    const [openEdit, setOpenEdit] = useState(false); 
    const closeModalEdit = () => setOpenEdit(false);

    const [editedTitle, setEditedTitle] = useState(props.pinsInfo.title);
    const [editedDescription, setEditedDescription] = useState(props.pinsInfo.description);
    const [editedTags, setEditedTags] = useState(props.pinsInfo.tags);

    // Function to handle pin edit submission
    const handleEditSubmit = () => {
        // Call a function to submit the edited pin information
        // For now, let's just log the edited information
        console.log("Edited Title:", editedTitle);
        console.log("Edited Description:", editedDescription);
        console.log("Edited Tags:", editedTags);
        // You can replace the console.log statements with the function to submit changes to the backend
        // Remember to close the edit modal after submitting changes
        closeModalEdit();
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
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <textarea
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <input
                                type="text"
                                value={editedTags}
                                onChange={(e) => setEditedTags(e.target.value)}
                                placeholder="Tags"
                            />
                            <button onClick={closeModalEdit}>Cancel</button>
                            <button onClick={handleEditSubmit}>Submit Changes</button>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    )
}