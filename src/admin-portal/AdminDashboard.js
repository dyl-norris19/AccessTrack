import React, {useState, useEffect} from "react"
import {retrievePinsAdmin, deletePin} from "../database.js"
import "./AdminDashboard.css"
import { Header, Footer } from "../Template"
import FocusPin from "./components/FocusPin"
import PinItem from "./components/PinItem"

export default function AdminDashboard() {

    const [pins, setPins] = useState([]);
    const [focusedPin, setFocusedPin] = useState(null)

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const pinsData = await retrievePinsAdmin();
            setPins(pinsData);
            if (pinsData.length > 0)
                setFocusedPin(pinsData[0])
        } catch(error) {
            console.log(error);
        }
    }

    let popup = document.getElementById("popup")

    function changeFocus(id) {
        const focusedPin = pins.find(pin => pin.id === id)
        setFocusedPin(focusedPin)
    }

    async function removePin(pinId) {
        try {
            await deletePin(pinId);
            const updatedPins = pins.filter(pin => pin.id !== pinId);
            setPins(updatedPins);

            if (focusedPin && focusedPin.id === pinId) {
                // If the removed pin was the last one, focus on the previous pin
                // Otherwise, focus on the next pin
                const focusedPinIndex = updatedPins.findIndex(pin => pin.id === pinId);
                const nextFocusedPin = focusedPinIndex === updatedPins.length ? updatedPins[focusedPinIndex - 1] : updatedPins[focusedPinIndex];
                setFocusedPin(nextFocusedPin);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header headerTitle="Admin Portal" />
            <div className="flex-grow-1 d-flex" id="popup">
                {focusedPin && (
                    <FocusPin 
                        pinsInfo={focusedPin}
                        removePin={() => removePin(focusedPin.id)}
                    />
                )}
                <div className="pin-list-container">
                    {pins.map(pin => (
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