import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import FileUploader from './components/FileUploader';

const App = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      setLoading(true);
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          },
        }
      ).then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      });
    }
  };

  return (
    <div className="App">
      <h1>Handwritten and Printed Document Text Recognition</h1>
      <FileUploader onDrop={handleDrop} />
      {loading ? (
        <div>
          <p>Processing... {progress}%</p>
        </div>
      ) : (
        <div>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default App;
