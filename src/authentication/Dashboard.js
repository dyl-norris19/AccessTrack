import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Header, Footer } from "../Template";
import { uploadImage } from "../storage";

export function Logout() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Logout"} />
      <div className="dashboard flex-grow-1 d-flex">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function EditProfile() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  async function getUserDocumentIdByUid(uid) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found for UID:", uid);
        return null;
      }

      // Assuming there's only one user document per UID
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    } catch (error) {
      console.error("Error fetching user document ID:", error);
      return null;
    }
  }

  async function handleSaveChanges() {
    try {
      // Get the profile document for the current user
      const userDocumentId = await getUserDocumentIdByUid(user.uid);
      const userRef = doc(db, "users", userDocumentId);

      let dataToUpdate = {}; // Initialize an empty object to hold the data to update

      // Construct the object with non-empty fields
      if (username !== "") dataToUpdate.username = username;
      if (name !== "") dataToUpdate.name = name;
      if (location !== "") dataToUpdate.location = location;
      if (bio !== "") dataToUpdate.bio = bio;

      // If photo is not null, update imgURL field
      if (photo) {
        const imgUrl = await uploadImage(photo);
        if (imgUrl) {
          dataToUpdate.imgURL = imgUrl;
        } else {
          console.error("Error uploading image: Image URL is null.");
        }
      }

      await updateDoc(userRef, dataToUpdate);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#fff" }}
    >
      <Header headerTitle={"Edit Profile"} />
      <div className="container mt-5">
        <h2>Edit Profile</h2>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="username" className="form-label">
              Change Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ backgroundColor: "#565656", color: "#fff" }}
            />
          </div>
          <div className="col">
            <label htmlFor="name" className="form-label">
              Change Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: "#565656", color: "#fff" }}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ backgroundColor: "#565656", color: "#fff" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Photo:
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ backgroundColor: "#565656", color: "#fff" }}
          />
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Selected"
              className="mt-2 img-thumbnail"
              style={{ maxWidth: "100px" }}
            />
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio:
          </label>
          <textarea
            className="form-control"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ backgroundColor: "#565656", color: "#fff" }}
          />
        </div>
        <button
          className="btn btn-primary me-2"
          style={{ backgroundColor: "#6EE05B" }}
          onClick={handleSaveChanges}
        >
          Confirm my choices
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
      <Footer />
    </div>
  );
}
