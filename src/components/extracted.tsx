import React from "react";
import { LoadingSpinner } from "@/src/components/icons";

export const Extracted: React.FC<{
  extractedText: string;
  isProcessing: boolean;
}> = ({ extractedText, isProcessing }) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-gray-900 mb-2">Extracted Text</h3>
      <div className="border border-gray-200 rounded-md p-3 bg-gray-50 min-h-[120px] max-h-[200px] overflow-y-auto text-gray-700 relative">
        {extractedText ? (
          <p className="whitespace-pre-wrap">{extractedText}</p>
        ) : (
          <p className="text-gray-400 italic text-sm">
            The extracted text will appear here after processing.
          </p>
        )}
        {isProcessing && (
          <div className="absolute inset-0 bg-gray-50/80 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <LoadingSpinner className="h-8 w-8 text-gray-500" />
              <p className="mt-2 text-sm text-gray-500">Extracting text...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
