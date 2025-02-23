import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Function to fetch all reports
export async function fetchReports() {
  const querySnapshot = await getDocs(collection(db, "reports"));
  let reports = [];
  querySnapshot.forEach((doc) => {
    reports.push({ id: doc.id, ...doc.data() });
  });
  return reports;
}

// Function to add a new report
export async function addReport(report) {
  await addDoc(collection(db, "reports"), report);
}
