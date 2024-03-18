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
  deleteDoc,
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

// Deletes a report from the database using its document ID
async function deleteReport(reportId) {
  try {
    await deleteDoc(doc(db, "report", reportId));
    console.log("Report with ID:", reportId, "deleted successfully.");
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the report.");
  }
}

// Deletes a pin from the database using its document ID
async function deletePin(pinId) {
  try {
    await deleteDoc(doc(db, "pins", pinId));
    console.log("Pin with ID:", pinId, "deleted successfully.");
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the pin.");
  }
}

// delete a rating from the database using its document ID
async function deleteRating(ratingId) {
  try {
    await deleteDoc(doc(db, "pinRating", ratingId));
    console.log("Rating with ID:", ratingId, "deleted successfully.");
  } catch (err) {
    console.error(err);
    alert("An error occurred while deleting the rating.");
  }
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

  // for demonstrating the delete report functionality
  const [reportIdToDelete, setReportIdToDelete] = useState("");

  async function handleDeleteReport(event) {
    event.preventDefault(); // keeps the page from reloading after submission

    if (reportIdToDelete.trim() === "") {
      alert("Please enter a report ID to delete.");
      return;
    }

    await deleteReport(reportIdToDelete);
    setReportIdToDelete("");
  }

  function handleReportIdChange(event) {
    setReportIdToDelete(event.target.value);
  }

  // for demonstrating the delete pin functionality
  const [pinIdToDelete, setPinIdToDelete] = useState("");

  async function handleDeletePin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if (pinIdToDelete.trim() === "") {
      alert("Please enter a pin ID to delete.");
      return;
    }

    await deletePin(pinIdToDelete);
    setPinIdToDelete("");
  }

  function handlePinIdChange(event) {
    setPinIdToDelete(event.target.value);
  }

  // for demonstrating the delete rating functionality
  const [ratingIdToDelete, setRatingIdToDelete] = useState("");

  async function handleDeleteRating(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if (ratingIdToDelete.trim() === "") {
      alert("Please enter a rating ID to delete.");
      return;
    }

    await deleteRating(ratingIdToDelete);
    setRatingIdToDelete("");
  }

  function handleRatingIdChange(event) {
    setRatingIdToDelete(event.target.value);
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

      {/* Form for deleting a report */}
      <form onSubmit={handleDeleteReport}>
        <label>
          Report ID:
          <input
            type="text"
            value={reportIdToDelete}
            onChange={handleReportIdChange}
          />
        </label>
        <button type="submit">Delete Report</button>
      </form>

      {/* Form for deleting a pin */}
      <form onSubmit={handleDeletePin}>
        <label>
          Pin ID:
          <input
            type="text"
            value={pinIdToDelete}
            onChange={handlePinIdChange}
          />
        </label>
        <button type="submit">Delete Pin</button>
      </form>

      {/* Form for deleting a rating */}
      <form onSubmit={handleDeleteRating}>
        <label>
          Rating ID:
          <input
            type="text"
            value={ratingIdToDelete}
            onChange={handleRatingIdChange}
          />
        </label>
        <button type="submit">Delete Rating</button>
      </form>
    </div>
  );
}

export {
  DatabaseStuff,
  retrievePins,
  createPin,
  deletePin,
  retrieveReports,
  createReport,
  deleteReport,
  retrieveRatings,
  createRating,
  deleteRating,
  getCurrentUserId,
};
