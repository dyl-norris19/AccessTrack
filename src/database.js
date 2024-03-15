import { auth, db } from "./firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  GeoPoint,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Header } from "./Template";

// retreives all pins from the database, and returns said pins
async function retrievePins() {
  try {
    const q = query(collection(db, "pins"));
    const doc = await getDocs(q);
    return doc;
    // doc.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching pins");
  }
}

async function createPin(pin) {
  try {
    const docRef = await addDoc(collection(db, "pins"), pin);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    alert("An error occured while creating a pin");
  }
}

// Function to get the currently logged-in user's UID
function getCurrentUserId() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error("No user logged in."));
      }
    });
  });
}

// react component as an example to display all this stuff, and show how to use it
function DatabaseStuff() {
  // helper function to retrieve all pins from the database
  async function retrievePinsMine() {
    try {
      const doc = await retrievePins();
      doc.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  }

  // helper function to create a pin in the database
  async function createPinMine() {
    getCurrentUserId().then((uid) => {
      //const userRef = db.collection("users").doc(uid);
      const pin = {
        title: "San Francisco",
        description: "A city in California",
        location: new GeoPoint(37.7749, -122.4194),
        timestamp: Timestamp.now(),
        creator: uid,
      };
      try {
        createPin(pin);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <div>
      <Header headerTitle={"Database Stuff"} />
      <button onClick={retrievePinsMine}>Click me to retrieve pins</button>
      <button onClick={createPinMine}>Click me to create a pin</button>
    </div>
  );
}

export { DatabaseStuff, retrievePins, createPin };
