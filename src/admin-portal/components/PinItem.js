import React from "react"
import "./PinItem.css"

export default function PinItem(props) {
    const avgQ = isNaN(props.avgQualityRating) ? "n/a" : props.avgQualityRating
    const avgA = isNaN(props.avgAccuracyRating) ? "n/a" : props.avgAccuracyRating
    let avgRating

    if (avgQ === "n/a" | avgA === "n/a") {
        avgRating = "No Rating"
    } else {
        avgRating = (avgQ + avgA) / 2
    }

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

    return (
        <div className="pin-item" onClick={() => props.onClick(props.pinsInfo.id)}>
            <div className="image-placeholder">
                <img src={props.pinsInfo.Photo} alt="Pin Image"/>
            </div>
            <div>
                <h1 className="pin-list-title">{props.pinsInfo.title}</h1>
                <h3 className="pin-list-time">{timeDifference}</h3>
            </div>
            <div className="rating-PinItem"> {/*will fix this later to look like*/}
                <h3 className="rating-and-location" style={{fontSize: avgRating !== "No Rating" ? '36px' : 'inherit'}}>{avgRating}</h3>
                {avgRating !== "No Rating" && <img src="../star.png" style={{ width: '45px', height: '45px' }} />}
            </div>
        </div>
    )
}