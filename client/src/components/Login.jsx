import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  getIdToken,
} from "@firebase/auth";
import app from "../firebaseConfig"
import {useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/drive.file");

  const loginWithGoogle = async () => {
    setError('')
    const result = await signInWithPopup(auth, provider);
    const token = await getIdToken(result.user);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const googleAccessToken = credential.accessToken;

    try {
      const response = await fetch("https://letter-assign-8tao.vercel.app/auth/google", {
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
      navigate('/dashboard')
    } catch (error) {
      console.error("Error during login:", error);
      setError(error)
    }
  };
  return (
    <>
      <p className=" text-neutral-300 mt-3">
        Sign in to create and save your letters
      </p>

      <div className=" p-6 pt-0 grid gap-4">
        <button onClick={loginWithGoogle} className=" cursor-pointer h-9 px-3 py-2 border w-full flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          Sign in with Google
        </button>
        {
         error && <div className=" text-center text-neutral-300">{error}</div>
        }
        
      </div>
    </>
  );
};

export default Login;
