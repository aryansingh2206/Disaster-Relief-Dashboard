import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Report({ user }) {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
  });

  // Fetch disaster reports from Firestore
  useEffect(() => {
    async function fetchReports() {
      const querySnapshot = await getDocs(collection(db, "reports"));
      let reportsList = [];
      querySnapshot.forEach((doc) => {
        reportsList.push({ id: doc.id, ...doc.data() });
      });
      setReports(reportsList);
    }
    fetchReports();
  }, []);

  // Handle adding a new report
  const handleAddReport = async () => {
    if (!user) {
      alert("Please log in to submit a report.");
      return;
    }

    if (!newReport.title || !newReport.description || !newReport.location) {
      alert("All fields are required.");
      return;
    }

    const reportToSubmit = {
      ...newReport,
      status: "Pending",
      submittedBy: user.email,
    };

    try {
      await addDoc(collection(db, "reports"), reportToSubmit);
      alert("Report Added Successfully!");

      // Refresh the report list
      const querySnapshot = await getDocs(collection(db, "reports"));
      let reportsList = [];
      querySnapshot.forEach((doc) => {
        reportsList.push({ id: doc.id, ...doc.data() });
      });
      setReports(reportsList);

      // Clear input fields
      setNewReport({ title: "", description: "", location: "" });
    } catch (error) {
      console.error("Error adding report:", error);
      alert("Failed to add report.");
    }
  };

  return (
    <div>
      <h2>Submit a Disaster Report</h2>
      <input
        type="text"
        placeholder="Title"
        value={newReport.title}
        onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={newReport.location}
        onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newReport.description}
        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
      />
      <button onClick={handleAddReport}>Add Report</button>

      <h2>Reports:</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>{report.title}</strong> - {report.location} (Submitted by: {report.submittedBy || "Anonymous"})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Report;
