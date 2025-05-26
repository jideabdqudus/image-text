import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { GitHubIcon } from "@/src/components/icons";

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-4 flex justify-between items-center"
    >
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
    </motion.header>
  );
};
