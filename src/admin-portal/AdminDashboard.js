import React from "react"
import "./AdminDashboard.css"
import { Header, Footer } from "../Template"
import FocusPin from "./components/FocusPin"
import PinItem from "./components/PinItem"
import pinsData from "./pinsData"

export default function AdminDashboard() {
    const pinsInfo = []

    pinsData.data.pins.map(pin => {
        pinsInfo.push({
            id: pin.id,
            title: pin.title,
            time: pin.time,
            location: pin.location,
            rating: pin.rating,
            image: pin.image,
            description: pin.description,
            tags: pin.tags.join(", ")
        })
    })

    const [pin, setPin] = React.useState(pinsInfo[0])

    let popup = document.getElementById("popup")

    function changeFocus(id) {
        let index
        for (let i = 0; i < pinsInfo.length; i++)
            if (pinsInfo[i].id === id)
                index = i

        setPin(pinsInfo[index])
    }

    function blur() {
        console.log("blur")
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header headerTitle="Admin Portal" />
            <div className="flex-grow-1 d-flex" id="popup">
                <FocusPin 
                    key={pin.id}
                    pinsInfo={pin}
                    blur={() => blur()}
                />
                <div className="pin-list-container">
                    {pinsInfo.map(pin => (
                        <PinItem
                            key={pin.id}
                            pinsInfo={pin}
                            onClick={() => changeFocus(pin.id)}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}