import React, { useState } from "react";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError("");
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3000/draft/letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: description }),
        credentials: "include",
      });
      
      if (!response.ok) throw new Error("Failed to save the letter.");
      setMessage("Letter saved successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpload = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3000/letter/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ title, content: description }),
        credentials: "include",
      });
      
      if (!response.ok) throw new Error("Failed to upload the letter.");
      const data = await response.json();
      setMessage("Letter uploaded successfully!");
      console.log("Upload response:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto rounded-lg shadow-md">
      <h1 className="text-xl mb-4">Simple Letter Editor</h1>

      {error && <p className=" text-neutral-300 mb-4">{error}</p>}
      {message && <p className="text-neutral-300 mb-4">{message}</p>}

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

      <div className="w-full mb-6 flex gap-4">
        <button
          onClick={handleSave}
          className="w-30 cursor-pointer px-2 py-1 border flex items-center justify-center rounded-md text-sm font-medium hover:bg-neutral-600"
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
