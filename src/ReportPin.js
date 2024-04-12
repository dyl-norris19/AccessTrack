import React, { useState, useEffect } from "react";
import { createReport, getCurrentUserId } from "./database";
import { useParams } from "react-router-dom";
import { Header, Footer } from "./Template";
import "./CreatePin.css";

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
    };

    await createReport(report);
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
          {/* <textarea
            className="form-control"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ backgroundColor: "#565656", color: "#fff" }}
          /> */}
          <button className="create__btn" onClick={createReportMine}>
            Submit Report
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportPin;

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Header headerTitle={"Report Pin"} />
//       <div className="register  flex-grow-1 d-flex">
//         <div className="register__container">
//           <form onSubmit={createReport}>
//             <label>
//               Title:
//               <input type="text" name="Title" />
//             </label>
//             <label>
//               Description:
//               <input type="text" name="Description" />
//             </label>
//             <button type="submit" onSubmit="createReportMine()">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default ReportPin;
