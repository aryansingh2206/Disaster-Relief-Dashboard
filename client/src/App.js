import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Report from "./Report"; // Import Report component
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Check user authentication status
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Disaster Relief Platform</h1>
        <p>Firebase is connected successfully!</p>

        {user ? (
          <>
            <p>Welcome, {user.email}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        )}

        {/* Render the Report component and pass user as a prop */}
        <Report user={user} />
      </header>
    </div>
  );
}

export default App;
