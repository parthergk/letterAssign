import React from "react";
import { Link } from "react-router-dom";

const LetterList = ({ letters }) => {
  console.log("letters", letters);

  return (
    <div className="grid gap-4">
      {letters.map((letter) => {
        const isDriveLetter = letter.id && letter.webViewLink; // Check if it's a Google Drive letter

        return (
          <div
            key={isDriveLetter ? letter.id : letter._id}
            className="p-4 border border-neutral-400 shadow-md rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-md font-semibold text-white">
                {isDriveLetter ? letter.name : letter.title}
              </h3>
              {isDriveLetter ? (
                <a
                  href={letter.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 w-lg truncate inline-block"
                >
                  Link: {letter.webViewLink}
                </a>
              ) : (''
              )}
            </div>
            {isDriveLetter ? (
              <a href={letter.webViewLink} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 text-sm font-medium border text-gray-300 border-gray-300 rounded-lg hover:bg-neutral-500">
                  View
                </button>
              </a>
            ) : (
              <Link to={`/editor/${letter._id}`}>
                <button className="px-4 py-2 text-sm font-medium border text-gray-300 border-gray-300 rounded-lg hover:bg-neutral-500">
                  Open
                </button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LetterList;
