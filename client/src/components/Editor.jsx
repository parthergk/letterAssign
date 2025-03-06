import React from "react";
import { useState } from "react";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    alert("Letter saved!");
    console.log({ title, description });
  };
  const handleUpload = async () => {
    const letterContent = {
      title,
      content,
    };

    const uploadResponse = await fetch("http://localhost:3000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ letterContent }),
      credentials: "include",
    });

    console.log("Upload response:", await uploadResponse.json());
  };
  return (
    <div className="p-6 w-full max-w-4xl mx-auto rounded-lg shadow-md">
      <h1 className="text-xl mb-4">Simple Letter Editor</h1>

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-medium">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter letter title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Description:
        </label>
        <textarea
          id="description"
          rows="8"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write your letter content here..."
        />
      </div>

      <div className=" w-full mb-6 flex gap-4">
        <button
          onClick={handleSave}
          className=" w-30 cursor-pointer px-2 py-1 border flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-600"
        >
          Save Letter
        </button>
        <button
          onClick={handleUpload}
          className="w-40 cursor-pointer px-2 py-1 border flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-600"
        >
          Upload On Drive
        </button>
      </div>
    </div>
  );
};

export default Editor;
