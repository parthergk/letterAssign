import './App.css'
import {GoogleAuthProvider, signInWithPopup, getAuth, getIdToken} from "@firebase/auth";
import app from './firebaseConfig';

function App() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async ()=>{
    const result = await signInWithPopup(auth, provider);
    const token = await getIdToken(result.user);
    await fetch('http://localhost:3000/auth/google', {
      method: "POST",
      headers: {
        "Conetent-Type": "application/json"
      },
      body: JSON.stringify({token})
    })    
  }

  return (
    <div><button onClick={loginWithGoogle}>Login with Google</button></div>
  )
}

export default App
