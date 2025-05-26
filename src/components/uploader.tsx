import React from "react";
import { UploadIcon } from "@/src/components/icons";

type UploaderTypes = {
  previewUrl: string | null;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropzoneClick: () => void;
};

export const Uploader: React.FC<UploaderTypes> = ({
  previewUrl,
  error,
  fileInputRef,
  handleFileChange,
  handleDragOver,
  handleDrop,
  handleDropzoneClick,
}) => {
  return (
    <div
      className={`border-2 border-dashed ${
        error ? "border-red-300" : "border-gray-300"
      } rounded-lg p-6 flex flex-col items-center justify-center flex-grow cursor-pointer hover:border-gray-400 transition-colors`}
      onClick={handleDropzoneClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!previewUrl ? (
        <div className="text-center">
          <UploadIcon />
          <div className="flex text-sm text-gray-600 mt-4">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
            >
              <span>Upload an image</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, WEBP up to 10MB
          </p>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-40 rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
};
