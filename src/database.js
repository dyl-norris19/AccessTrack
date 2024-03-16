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

// retreives all reports from the database, and returns said reports
async function retrieveReports() {
  try {
    const q = query(collection(db, "report"));
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

// retreives all ratings from the database, and returns said ratings
async function retrieveRatings() {
  try {
    const q = query(collection(db, "pinRating"));
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

// creates a pin in the database
async function createPin(pin) {
  try {
    const docRef = await addDoc(collection(db, "pins"), pin);
    console.log("Pin document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    alert("An error occured while creating a pin");
  }
}

// creates a report in the database
async function createReport(report) {
  try {
    const docRef = await addDoc(collection(db, "report"), report);
    console.log("Report document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    alert("An error occured while creating a report");
  }
}

// creates a pin rating in the database
async function createRating(rating) {
  try {
    const docRef = await addDoc(collection(db, "pinRating"), rating);
    console.log("Rating document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    alert("An error occured while creating a rating");
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

/****************************************************************************************************************************************************************************/
// react component as an example to display all this stuff, and show how to use it
function DatabaseStuff() {
  // demonstration function to retrieve all pins from the database
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

  // helper function to create a report in the database
  async function createReportMine() {
    getCurrentUserId().then((uid) => {
      //const userRef = db.collection("users").doc(uid);
      const report = {
        title: "Another Bad Pin",
        description: "This is worse than the last one!",
        pinID: "/pins/1234",
        creatorID: uid,
      };
      try {
        createReport(report);
      } catch (error) {
        console.error(error);
      }
    });
  }

  // demonstration function to retrieve all reports from the database
  async function retrieveReportsMine() {
    try {
      const doc = await retrieveReports();
      doc.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  }

  // function to create a pin rating in the database
  async function createRatingMine() {
    getCurrentUserId().then((uid) => {
      //const userRef = db.collection("users").doc(uid);
      const rating = {
        accuracy: 4,
        creatorID: uid,
        description: "This is a great pin!",
        pinID: "/pins/1234",
        quality: 5,
        timestamp: Timestamp.now(),
      };
      try {
        createRating(rating);
      } catch (error) {
        console.error(error);
      }
    });
  }

  // demonstration function to retrieve all pins from the database
  async function retrieveRatingsMine() {
    try {
      const doc = await retrieveRatings();
      doc.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header headerTitle={"Database Stuff"} />
      <button onClick={retrievePinsMine}>Click me to retrieve pins</button>
      <button onClick={createPinMine}>Click me to create a pin</button>
      <button onClick={createReportMine}>Click me to create a report</button>
      <button onClick={retrieveReportsMine}>
        Click me to retrieve reports
      </button>
      <button onClick={createRatingMine}>Click me to create a rating</button>
      <button onClick={retrieveRatingsMine}>
        Click me to retrieve ratings
      </button>
    </div>
  );
}

export {
  DatabaseStuff,
  retrievePins,
  createPin,
  retrieveReports,
  createReport,
  retrieveRatings,
  createRating,
  getCurrentUserId,
};
