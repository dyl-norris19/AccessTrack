import React, { useState, useEffect } from "react";
import { createReport, getCurrentUserId } from "./database";
import { useParams } from "react-router-dom";
import { Header, Footer } from "./Template";
import "./ReportPin.css";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

function ReportPin() {
  const { pinID } = useParams();
  const [newTitle, setTitle] = useState("");
  const [newText, setText] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await getCurrentUserId();
      setUserId(id);
    }
    fetchUserId();
  }, []);

  async function createReportMine() {
    const report = {
      Title: newTitle,
      Description: newText,
      creatorID: userId,
      PinId: pinID,
      Timestamp: Timestamp.now(),
    };

    await createReport(report);
    alert("Report Submitted");
    window.location.href = "/";
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Report Pin"} />
      <div className="register  flex-grow-1 d-flex">
        <div className="create__container">
          <input
            type="text"
            className="create__textBox"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Report Title"
          />
          <textarea
            type="text"
            className="create__textBox"
            value={newText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Report Description"
          />
          <button className="create__btn" onClick={createReportMine}>
            Submit Report
          </button>
          <div>
            <Link to="/">Cancel Report</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportPin;
