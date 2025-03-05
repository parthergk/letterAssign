import "./App.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  getIdToken,
} from "@firebase/auth";
import app from "./firebaseConfig";

function App() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/drive.file");

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await getIdToken(result.user);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const googleAccessToken = credential.accessToken;

    try {
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, googleAccessToken }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      const letterContent = {
        title: "My First Letter",
        content: "Dear John,\n\nI hope this letter finds you well. I wanted to express my gratitude for your support...\n\nBest regards,\nJane Doe"
      };
      
      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ letterContent }),
        credentials: "include",
      });
      
      console.log("Upload response:", await uploadResponse.json());
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}

export default App;
