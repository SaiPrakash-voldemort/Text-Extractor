import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

export const handleImageOCR = (file) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m), // Optional: track progress
    }).then(({ data: { text } }) => resolve(text))
      .catch(reject);
  });
};

export const handlePDFParsing = async (file) => {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  let extractedText = '';

  pages.forEach((page) => {
    extractedText += page.getTextContent();
  });

  return extractedText;
};

export const handleDocxParsing = async (file) => {
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value; // Extracted raw text
};
