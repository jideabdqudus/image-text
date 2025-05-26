import { useState, useRef, useCallback } from "react";

export type ProcessingMode = "extract" | "analyze";

export interface ImageExtractorState {
  selectedImage: File | null;
  previewUrl: string | null;
  extractedText: string;
  analysisResult: string;
  isProcessing: boolean;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  mode: ProcessingMode;
}

export interface ImageExtractorActions {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropzoneClick: () => void;
  extractText: () => Promise<void>;
  analyzeImage: () => Promise<void>;
  handleReset: () => void;
  loadSampleImage: () => Promise<void>;
  setMode: (mode: ProcessingMode) => void;
}

export const useImageExtractor = (): ImageExtractorState &
  ImageExtractorActions => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ProcessingMode>("extract");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setError(null);
      setExtractedText("");
      setAnalysisResult("");
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, WEBP)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];

        const syntheticEvent = {
          target: {
            files: [file],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        handleFileChange(syntheticEvent);
      }
    },
    [handleFileChange]
  );

  const handleDropzoneClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const convertImageToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  const extractText = useCallback(async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const base64Image = await convertImageToBase64(selectedImage);

      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract text from the image");
      }

      const data = await response.json();
      setExtractedText(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, convertImageToBase64]);

  const analyzeImage = useCallback(async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const base64Image = await convertImageToBase64(selectedImage);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the image");
      }

      const data = await response.json();
      setAnalysisResult(data.text);
      setExtractedText(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, convertImageToBase64]);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setExtractedText("");
    setAnalysisResult("");
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  const loadSampleImage = useCallback(async () => {
    try {
      setError(null);
      setExtractedText("");
      setAnalysisResult("");
      const response = await fetch("/assets/images/sample-image.png");
      if (!response.ok) {
        throw new Error("Failed to load sample image");
      }
      const blob = await response.blob();
      const file = new File([blob], "sample-image.png", {
        type: "image/png",
      });
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    }
  }, []);

  return {
    selectedImage,
    previewUrl,
    extractedText,
    analysisResult,
    isProcessing,
    error,
    fileInputRef,
    mode,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleDropzoneClick,
    extractText,
    analyzeImage,
    handleReset,
    loadSampleImage,
    setMode,
  };
};
