import React from "react";
import { Link } from "react-router-dom";

const LetterList = ({ letters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {letters.map((letter) => {
        const isDriveLetter = letter.id && letter.webViewLink;

        return (
          <div
            key={isDriveLetter ? letter.id : letter._id}
            className="p-4 border border-neutral-400 shadow-md rounded-lg flex flex-col justify-between gap-3 bg-neutral-800"
          >
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                {isDriveLetter ? letter.name : letter.title}
              </h3>
              {isDriveLetter && (
                <a
                  href={letter.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 break-words block"
                >
                  {letter.webViewLink}
                </a>
              )}
            </div>

            <div className="mt-auto">
              {isDriveLetter ? (
                <a href={letter.webViewLink} target="_blank" rel="noopener noreferrer">
                  <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium border text-gray-300 border-gray-300 rounded-lg hover:bg-neutral-500">
                    View
                  </button>
                </a>
              ) : (
                <Link to={`/editor/${letter._id}`}>
                  <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium border text-gray-300 border-gray-300 rounded-lg hover:bg-neutral-500">
                    Open
                  </button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LetterList;
