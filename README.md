# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Text Recognition App 

Hosted On Netlify
Live link :https://textextracter.netlify.app/

This is a Text Recognition App built using ReactJS that supports extracting text from different types of files such as images (using Tesseract), Word documents (using Mammoth.js), and PDFs (using PDF.js).
Features

    Image Text Extraction: Supports OCR for image files like JPEG, PNG, etc.
    Word Document Parsing: Extracts text from .docx files.
    PDF Parsing: Extracts text from .pdf files.
    Excel Parsing: Extracts text from .xlsx files (if needed).

Tech Stack

    React.js: Frontend library
    Tesseract.js: For OCR (Image text recognition)
    Mammoth.js: For extracting text from .docx files
    PDF.js: For extracting text from .pdf files
    React Dropzone: For file upload functionality

Installation and Setup
Prerequisites

Ensure you have Node.js installed on your system. You can download it here.
Step 1: Clone the Repository

bash

git clone https://github.com/your-username/text-recognition-app.git
cd text-recognition-app

Step 2: Install Dependencies

Run the following command to install the necessary packages:

bash

npm install

Step 3: Start the Application

Run the following command to start the application:

bash

npm run dev

Open http://localhost:5173 to view the app in your browser.

Packages Used
1. Tesseract.js (for OCR from images)

Tesseract.js is a pure JavaScript library that allows you to recognize text in images.
Installation:

bash

npm install tesseract.js

Usage:

Tesseract is used to extract text from images (JPEG, PNG, etc.) by performing OCR.

javascript

import Tesseract from 'tesseract.js';

export const handleImageOCR = (file) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(file, 'eng', {
            logger: (m) => console.log(m), // Optional: Progress logger
        })
        .then(({ data: { text } }) => resolve(text))
        .catch(reject);
    });
};

2. Mammoth.js (for DOCX file parsing)

Mammoth.js converts .docx documents into raw text, making it easy to extract readable content from Word files.
Installation:

bash

npm install mammoth

Usage:

Mammoth is used to extract text from DOCX files.

javascript

import mammoth from 'mammoth';

export const handleDocxParsing = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value; // Extracted text
};

3. PDF.js (for PDF file parsing)

PDF.js is a popular library for parsing and displaying PDFs in the browser.
Installation:

bash

npm install pdfjs-dist

Usage:

PDF.js is used to extract text from PDFs.

javascript

import * as pdfjsLib from 'pdfjs-dist/build/pdf';

export const handlePdfParsing = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let extractedText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        extractedText += pageText + '\n';
    }

    return extractedText;
};

4. React Dropzone (for File Upload)

React Dropzone is a file uploader component that lets users drag-and-drop or select files.
Installation:

bash

npm install react-dropzone

Usage:

javascript

import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/pdf': ['.pdf']
        }
    });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop a file here, or click to select one</p>
        </div>
    );
};

export default FileUploader;

Usage Instructions

    Upload Files: Drag and drop or click to upload image files (for OCR), .docx files (for Word document parsing), and .pdf files (for PDF parsing).
    Text Extraction: The text from the uploaded file will be extracted and displayed on the screen.
    Supported File Types:
        Images: .jpeg, .png, .jpg
        Word Documents: .docx
        PDFs: .pdf

Notes

    Error Handling: If the file type is unsupported or any errors occur during text extraction, appropriate error messages will be displayed.
    Performance: Large PDF or Word files may take some time to process, depending on file size and content complexity.

Future Enhancements

    Add support for other file formats like .xlsx (Excel files) using SheetJS.
    Improve error handling and display more meaningful messages for unsupported file types.
