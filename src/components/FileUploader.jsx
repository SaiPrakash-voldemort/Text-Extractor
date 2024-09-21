import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

export default FileUploader;
