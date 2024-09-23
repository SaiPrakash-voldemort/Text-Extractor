import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Manually set the worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

export const handleImageOCR = (file) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(file, 'eng', {
      logger: (m) => console.log(m), // Optional: track progress
    }).then(({ data: { text } }) => resolve(text))
      .catch(reject);
  });
};

export const handlePDFParsing = async (file) => {
  const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));

  const pdf = await loadingTask.promise;
  let extractedText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    extractedText += pageText;
  }

  return extractedText;
};

export const handleDocxParsing = async (file) => {
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value; // Extracted raw text
};
