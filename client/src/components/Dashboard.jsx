import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LetterList from "./LetterList";

const Dashboard = () => {
  const [view, setView] = useState("drive");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [draftLetters, setDraftLetters] = useState([]);
  const [driveLetters, setDriveLetters] = useState([]);

  const getLetterFromDrive = async ()=>{
    const getResponse = await fetch("http://localhost:3000/letter", {
      method: "GET",
      credentials: "include",
    });
    const result = await getResponse.json();
    setDriveLetters(result);
  }

  const getLetterFromDb = async ()=>{
    const getResponse = await fetch("http://localhost:3000/draft/letter", {
      method: "GET",
      credentials: "include",
    });
    const result = await getResponse.json();    
    setDraftLetters(result);
  }

  useEffect(() => {
    getLetterFromDrive();
    getLetterFromDb();
  }, []);

  return (
    <div className="bg-neutral-950 rounded-md flex flex-col items-center py-10 px-6 w-full">
      <h1 className="text-5xl font-semibold text-white">Create and View Letters</h1>

      <div className="flex w-full max-w-2xl justify-center items-center gap-4 mt-5">
        <Link to="/editor">
          <button className="cursor-pointer h-9 px-4 py-2 border w-full flex items-center justify-center rounded-md text-sm font-medium text-white hover:bg-neutral-600">
            + Create New Letter
          </button>
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer h-9 px-4 py-2 border rounded-md text-sm font-medium text-white flex items-center gap-2 hover:bg-neutral-600"
          >
            {view === "drive" ? "Drive Letters" : "Draft Letters"} ▼
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-neutral-800 border border-gray-600 rounded-md shadow-lg">
              <button
                onClick={() => {
                  setView("drive");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-white text-sm hover:bg-neutral-700"
              >
                Drive Letters
              </button>
              <button
                onClick={() => {
                  setView("draft");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-white text-sm hover:bg-neutral-700"
              >
                Draft Letters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl mt-6">
        <h2 className="text-lg font-medium text-white mb-3">
          {view === "draft" ? "Draft Letters" : "Drive Letters"}
        </h2>

        {view === "draft" && draftLetters.length > 0 ? (
          <LetterList letters={draftLetters} />
        ) : view === "drive" && driveLetters.length > 0 ? (
          <LetterList letters={driveLetters} />
        ) : (
          <p className="text-gray-400">No letters found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
