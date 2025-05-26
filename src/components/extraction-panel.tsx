import { Button } from "@/src/components/ui/button";
import { Uploader } from "@/src/components/uploader";
import {
  ImageExtractorState,
  ImageExtractorActions,
} from "@/src/lib/hooks/useImage";

import { LoadingSpinner, ExtractIcon } from "@/src/components/icons";
import { motion } from "framer-motion";

type ImageExtractionPanelProps = ImageExtractorState & ImageExtractorActions;

export const ImageExtractionPanel: React.FC<ImageExtractionPanelProps> = ({
  selectedImage,
  previewUrl,
  extractedText,
  analysisResult,
  isProcessing,
  error,
  fileInputRef,
  handleFileChange,
  handleDragOver,
  handleDrop,
  handleDropzoneClick,
  extractText,
  analyzeImage,
  handleReset,
  loadSampleImage,
  mode,
  setMode,
}) => {
  const processImage = () => {
    if (mode === "extract") {
      return extractText();
    } else {
      return analyzeImage();
    }
  };

  const getButtonText = () => {
    if (isProcessing) {
      return "Processing...";
    } else if (mode === "extract") {
      return "Extract Text";
    } else {
      return "Analyze Image";
    }
  };

  const getResultText = () => {
    if (mode === "extract") {
      return (
        extractedText || "The extracted text will appear here after processing."
      );
    } else {
      return (
        analysisResult ||
        "The image analysis will appear here after processing."
      );
    }
  };

  const resultLabel = mode === "extract" ? "Extracted Text" : "Image Analysis";
  const hasResult = mode === "extract" ? !!extractedText : !!analysisResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.5 }}
      className="border rounded-lg shadow-sm p-6 bg-white h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-bold text-xl">Upload an Image</h2>
        <div className="flex gap-2">
          {!selectedImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleImage}
              className="text-sm"
            >
              Try with sample
            </Button>
          )}
          {selectedImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-sm hover:text-red-700"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="mb-4 flex rounded-md overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 h-1 bg-black z-10"
          initial={{ width: "50%", x: mode === "extract" ? 0 : "100%" }}
          animate={{ x: mode === "extract" ? 0 : "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ width: "50%" }}
        />

        <motion.div
          className="absolute inset-0 bg-black z-0"
          initial={{ x: mode === "extract" ? 0 : "100%" }}
          animate={{ x: mode === "extract" ? 0 : "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ width: "50%" }}
        />

        <motion.button
          onClick={() => setMode("extract")}
          className={`flex-1 py-3 font-medium relative z-1 transition-colors duration-300 ${
            mode === "extract"
              ? "text-white bg-black"
              : "text-gray-700 bg-gray-100"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Extract Text
        </motion.button>
        <motion.button
          onClick={() => setMode("analyze")}
          className={`flex-1 py-3 font-medium relative z-1 transition-colors duration-300 ${
            mode === "analyze"
              ? "text-white bg-black"
              : "text-gray-700 bg-gray-100"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Analyze Image
        </motion.button>
      </div>

      <Uploader
        previewUrl={previewUrl}
        error={error}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDropzoneClick={handleDropzoneClick}
      />

      <div>
        <Button
          className="mt-4 w-full rounded-md bg-black text-white py-2 flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={processImage}
          disabled={!selectedImage || isProcessing}
        >
          {isProcessing ? (
            <>
              <LoadingSpinner />
              Processing...
            </>
          ) : (
            <>
              <ExtractIcon />
              {getButtonText()}
            </>
          )}
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">{resultLabel}</h3>
        <div className="border border-gray-200 rounded-md p-3 bg-gray-50 min-h-[120px] max-h-[200px] overflow-y-auto text-gray-700 relative">
          {hasResult ? (
            <p className="whitespace-pre-wrap">{getResultText()}</p>
          ) : (
            <p className="text-gray-400 italic text-sm">{getResultText()}</p>
          )}
          {isProcessing && (
            <div className="absolute inset-0 bg-gray-50/80 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <LoadingSpinner className="h-8 w-8 text-gray-500" />
                <p className="mt-2 text-sm text-gray-500">
                  {mode === "extract"
                    ? "Extracting text..."
                    : "Analyzing image..."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
