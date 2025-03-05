import './App.css'
import {GoogleAuthProvider, signInWithPopup, getAuth} from "@firebase/auth";
import app from './firebaseConfig';

function App() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async ()=>{
    const result = await signInWithPopup(auth, provider);
    console.log("result of auth", result);
    
  }

  return (
    <div><button onClick={loginWithGoogle}>Login with Google</button></div>
  )
}

export default App
