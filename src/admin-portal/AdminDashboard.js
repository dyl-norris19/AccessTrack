import React from "react"
import "./AdminDashboard.css"
import {Header, Footer} from "../Template"

export default function AdminDashboard() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header headerTitle="Admin Portal" />
            <div className="flex-grow-1 d-flex">
                <div className="pin-in-focus">
                    <div className="image-and-tag">
                        <div className="pin-image">
                            <h1>pin image</h1>
                        </div>
                        <div className="tags" >
                            <h3 style={{color: '#6F6F6F'}}>#tag, #anothertag, #bruh</h3>
                        </div>
                    </div>
                    <div className="info-side">
                        <h1 className="title">Title</h1>
                        <p>a day ago</p>
                        <h2 className="location-and-rating">33.21118, -97.14728</h2>
                        <div className="rating">
                            <h2 className="location-and-rating">6.5/10</h2>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                        <div className="description">
                            <h1>Description...</h1>
                        </div>
                        <div className="button-container"> 
                            <button className="remove-button">Remove</button>
                            <button className="edit-button">Edit Pin</button>
                        </div>
                    </div>
                </div>
                <div className="pin-list-container">
                    <div className="pin-item">
                        <div className="image-placeholder">pin image</div>
                        <div>
                            <h1 className="pin-list-title">Title</h1>
                            <h3 className="pin-list-time">2 days ago</h3>
                        </div>
                        <div className="rating"> {/*will fix this later to look like*/}
                            <h3 className="location-and-rating">8.2/10</h3>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                    </div>
                    <div className="pin-item">
                        <div className="image-placeholder">pin image</div>
                        <div>
                            <h1 className="pin-list-title">Title</h1>
                            <h3 className="pin-list-time">2 days ago</h3>
                        </div>
                        <div className="rating"> {/*will fix this later to look like*/}
                            <h3 className="location-and-rating">8.2/10</h3>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                    </div>
                    <div className="pin-item">
                        <div className="image-placeholder">pin image</div>
                        <div>
                            <h1 className="pin-list-title">Title</h1>
                            <h3 className="pin-list-time">2 days ago</h3>
                        </div>
                        <div className="rating"> {/*will fix this later to look like*/}
                            <h3 className="location-and-rating">8.2/10</h3>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                    </div>
                    <div className="pin-item">
                        <div className="image-placeholder">pin image</div>
                        <div>
                            <h1 className="pin-list-title">Title</h1>
                            <h3 className="pin-list-time">2 days ago</h3>
                        </div>
                        <div className="rating"> {/*will fix this later to look like*/}
                            <h3 className="location-and-rating">8.2/10</h3>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                    </div>
                    <div className="pin-item">
                        <div className="image-placeholder">pin image</div>
                        <div>
                            <h1 className="pin-list-title">Title</h1>
                            <h3 className="pin-list-time">2 days ago</h3>
                        </div>
                        <div className="rating"> {/*will fix this later to look like*/}
                            <h3 className="location-and-rating">8.2/10</h3>
                            <img src="../star.png" style={{ width: '45px', height: '45px'}}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}