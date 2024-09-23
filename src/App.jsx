import React, { useState } from "react";
import {
  handleImageOCR,
  handlePDFParsing,
  handleDocxParsing,
} from "./utils/fileParsers";
import FileUploader from "./components/FileUploader";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    setLoading(true);
    const fileType = file.type;

    try {
      let extractedText = "";

      if (fileType.includes("image")) {
        extractedText = await handleImageOCR(file);
      } else if (fileType === "application/pdf") {
        extractedText = await handlePDFParsing(file);
      } else if (fileType.includes("wordprocessingml.document")) {
        extractedText = await handleDocxParsing(file);
      } else {
        extractedText =
          "Unsupported file type. Please upload images, PDFs, or Word documents.";
      }

      setText(extractedText);
    } catch (error) {
      setText("Error extracting text from file.");
    }

    setLoading(false);
  };

  return (
    <div className="App bg-slate-800 w-full h-screen flex flex-col gap-4 items-center p-5 text-white font-semibold font-serif">
      <h1 className="text-2xl m-2 p-2 text-center sm:text-4xl">
        Text Recognition for Different Files
      </h1>
      <FileUploader onDrop={handleDrop} />
      {loading ? <p>Processing...</p> : <p>{text}</p>}
    </div>
  );
};

export default App;
