import React from "react"
import "./PinItem.css"

export default function PinItem(props) {
    return (
        <div className="pin-item" onClick={() => props.onClick(props.pinsInfo.id)}>
            <div className="image-placeholder">
                <img src={props.pinsInfo.image} />
            </div>
            <div>
                <h1 className="pin-list-title">{props.pinsInfo.title}</h1>
                <h3 className="pin-list-time">{props.pinsInfo.time}</h3>
            </div>
            <div className="rating"> {/*will fix this later to look like*/}
                <h3 className="location-and-rating">{props.pinsInfo.rating}</h3>
                <img src="../star.png" style={{ width: '45px', height: '45px' }} />
            </div>
        </div>
    )
}