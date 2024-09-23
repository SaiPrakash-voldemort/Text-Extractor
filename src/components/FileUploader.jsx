import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onDrop }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div
      className=" m-2 sm:text-2xl border-2 border-dashed border-gray-300 p-5 sm:w-1/3 text-center cursor-pointer w-2/3 text-xl"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drag or Upload the file by clicking here</p>
    </div>
  );
};
export default FileUploader;
