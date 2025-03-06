import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  getIdToken,
} from "@firebase/auth";
import app from "./firebaseConfig";
import { Outlet } from "react-router-dom";

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
        title: "My Letter",
        content:
          "Dear John,\n\nI hope this letter finds you well. I wanted to express my gratitude for your support...\n\nBest regards,\nJane Doe",
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

      const getResponse = await fetch("http://localhost:3000/upload", {
        method: "GET",
        credentials: "include",
      });

      console.log("Upload response:", await getResponse.json());
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className=" text-white flex-1 flex flex-col gap-5 items-center justify-center  p-4 bg-neutral-950 h-screen w-full">
      <Outlet/>
    </div>
  );
}

export default App;
