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

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await getIdToken(result.user);
    try {
      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      await fetch("http://localhost:3000/letter", {
        method: 'POST',
        credentials: 'include'
      })
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
