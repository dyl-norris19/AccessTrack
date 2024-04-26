import React, {useState, useEffect} from "react"
import {retrievePinsAdmin, deletePin, ratingsByPinID} from "../database.js"
import "./AdminDashboard.css"
import { Header, Footer } from "../Template"
import FocusPin from "./components/FocusPin"
import PinItem from "./components/PinItem"

export default function AdminDashboard() {

    const [pins, setPins] = useState([])
    const [focusedPinId, setFocusedPinId] = useState(null)
    const [fetchDataTrigger, setFetchDataTrigger] = useState(false)

    useEffect(() => {
        fetchData()
    }, [fetchDataTrigger]);

    useEffect(() => {
        if (pins.length > 0 && focusedPinId == null)
            setFocusedPinId(pins[0].id)
    }, [pins, focusedPinId])

    async function fetchData() {
        try {
            const pinsData = await retrievePinsAdmin();
            setPins(pinsData)
        } catch(error) {
            console.log(error)
        }
    }

    function changeFocus(id) {
        setFocusedPinId(id)
    }

    async function removePin(pinId) {
        try {
            await deletePin(pinId)
            setPins(prevPins => prevPins.filter(pin => pin.id !== pinId))

            if (focusedPinId === pinId && pins.length > 1) {
                const newFocusedPinId = pins.find(pin => pin.id !== pinId).id
                setFocusedPinId(newFocusedPinId)

            } else if (focusedPinId === pinId && pins.length === 1)
                setFocusedPinId(null)

        } catch(error) {
            console.log(error);
        }
    }

    function triggerDataFetch() {
        setFetchDataTrigger(prevTrigger => !prevTrigger)
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header headerTitle="Admin Portal" />
            <div className="flex-grow-1 d-flex" id="popup">
                {focusedPinId && (
                    <FocusPin 
                        pinsInfo={pins.find(pin => pin.id === focusedPinId)}
                        removePin={() => removePin(focusedPinId)}
                        updateFocus={() => triggerDataFetch()}
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