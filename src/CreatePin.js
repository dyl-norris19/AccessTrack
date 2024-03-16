import {createPin} from "./database.js"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CreatePin.css";
import { Header, Footer } from "../Template";
import {
  GeoPoint,
  Timestamp,
} from "firebase/firestore";
