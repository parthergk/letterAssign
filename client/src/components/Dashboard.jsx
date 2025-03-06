import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LetterList from "./LetterList";

const Dashboard = () => {
  const [view, setView] = useState("drive");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [draftLetters, setDraftLetters] = useState([]);
  const [driveLetters, setDriveLetters] = useState([]);
  const [error, setError] = useState("");

  const getLetterFromDrive = async () => {
    try {
      const getResponse = await fetch("https://letter-assign-8tao.vercel.app/letter", {
        method: "GET",
        credentials: "include",
      });
      if (!getResponse.ok) throw new Error("Failed to fetch drive letters.");
      const result = await getResponse.json();
      setDriveLetters(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const getLetterFromDb = async () => {
    try {
      const getResponse = await fetch("https://letter-assign-8tao.vercel.app/draft/letter", {
        method: "GET",
        credentials: "include",
      });
      if (!getResponse.ok) throw new Error("Failed to fetch draft letters.");
      const result = await getResponse.json();
      setDraftLetters(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getLetterFromDrive();
    getLetterFromDb();
  }, []);

  return (
    <div className="bg-neutral-950 rounded-md flex flex-col items-center py-6 px-4 sm:px-6 w-full min-w-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center">
        Create and View Letters
      </h1>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="flex flex-wrap w-full max-w-3xl justify-center items-center gap-3 sm:gap-4 mt-5">
        <Link to="/editor" className="w-full sm:w-auto">
          <button className="cursor-pointer h-10 px-4 py-2 border w-full sm:w-auto flex items-center justify-center rounded-md text-sm sm:text-base font-medium text-white hover:bg-neutral-600">
            + Create New Letter
          </button>
        </Link>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer h-10 px-4 py-2 border w-full sm:w-auto rounded-md text-sm sm:text-base font-medium text-white flex items-center justify-between sm:justify-center gap-2 hover:bg-neutral-600"
          >
            {view === "drive" ? "Drive Letters" : "Draft Letters"} ▼
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-full sm:w-40 bg-neutral-800 border border-gray-600 rounded-md shadow-lg">
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

      <div className="w-full max-w-3xl mt-6">
        <h2 className="text-lg sm:text-xl font-medium text-white mb-3">
          {view === "draft" ? "Draft Letters" : "Drive Letters"}
        </h2>

        {view === "draft" && draftLetters.length > 0 ? (
          <LetterList letters={draftLetters} />
        ) : view === "drive" && driveLetters.length > 0 ? (
          <LetterList letters={driveLetters} />
        ) : (
          <p className="text-gray-400 text-center">No letters found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
