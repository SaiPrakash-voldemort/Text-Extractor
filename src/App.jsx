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
    <div className="flex flex-col items-center w-full h-screen gap-4 p-5 font-serif font-semibold text-white App bg-slate-900">
      <h1 className="p-2 m-2 text-2xl text-center sm:text-4xl">
        Text Recognition for Different Files
      </h1>
      <p>(Currently It Supports Images,Word and Pdf format files only)</p>
      <FileUploader onDrop={handleDrop} />
      {loading ? <p>Processing...</p> : <p>{text}</p>}
    </div>
  );
};

export default App;
