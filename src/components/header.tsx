"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { GitHubIcon } from "@/src/components/icons";

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-4"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="font-medium">📷 Image Text Solutions</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Link
              href="https://github.com/jideabdqudus/image-extractor"
              className="flex items-center gap-2"
              target="_blank"
            >
              <GitHubIcon />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
      {isVisible && (
        <div
          className="w-full flex items-start gap-3 p-4 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg mt-4"
          role="alert"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold">Warning:</span> This is a beta
            version of the app. Model may not be able to extract text from all
            images.
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-amber-500 hover:text-amber-700 hover:bg-amber-100 rounded p-0.5 transition-colors shrink-0 ml-auto bg-white"
            aria-label="Dismiss warning"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </motion.header>
  );
};
