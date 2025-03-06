import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  return (
    <>
      <h1 className="text-5xl font-semibold">
        Create and save the letter directly to Google Drive
      </h1>
        {/* <Link
          to="/login"
          className="border rounded-md px-4 py-1 inline-block text-white text-center"
        >
          Sign In with Google
        </Link> */}
        <Login/>
    </>
  );
};

export default Home;
