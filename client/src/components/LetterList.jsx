import React from 'react'
import { Link } from "react-router-dom";
const LetterList = ({ letters }) => (
    <div className="grid gap-4">
      {letters.map((letter) => (
        <div key={letter.id} className="p-4 border  border-neutral-400  shadow-md rounded-lg flex justify-between items-center">
          <div>
            <h3 className="text-md font-semibold text-white">{letter.title}</h3>
            <p className="text-sm text-gray-400">Saved on {letter.date}</p>
          </div>
          <Link to={`/editor/${letter.id}`}>
            <button className="px-4 py-2 text-sm font-medium border text-gray-300 border-gray-300 rounded-lg hover:bg-neutral-500">
              Open
            </button>
          </Link>
        </div>
      ))}
    </div>
  );

export default LetterList