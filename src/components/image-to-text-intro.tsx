import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProcessingMode } from "@/src/lib/hooks/useImage";
interface ImageToTextIntroProps {
  mode: ProcessingMode;
}

export const ImageToTextIntro: React.FC<ImageToTextIntroProps> = ({ mode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col space-y-6"
    >
      <div className="text-center md:text-left">
        <div className="mb-6">
          <p className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-700 text-xs mb-4">
            100% free & open source
          </p>

          <div>
            <AnimatePresence mode="wait">
              <motion.h1
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                {mode === "extract" ? (
                  <>
                    Image{" "}
                    <span className="inline-flex items-center">
                      <Image
                        src="/assets/images/arrow.png"
                        width={30}
                        height={30}
                        alt="arrow"
                        className="mr-2"
                      />
                      Text
                    </span>
                  </>
                ) : (
                  <>
                    Image{" "}
                    <span className="inline-flex items-center">
                      <Image
                        src="/assets/images/arrow.png"
                        width={30}
                        height={30}
                        alt="arrow"
                        className="mr-2"
                      />
                      Analysis
                    </span>
                  </>
                )}
              </motion.h1>
            </AnimatePresence>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            in one click <span className="inline-block animate-pulse">🚀</span>
          </h2>

          <div className="h-16">
            <AnimatePresence mode="wait">
              <motion.p
                key={mode}
                initial={{ opacity: 0, x: mode === "extract" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "extract" ? 20 : -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.1,
                }}
                className="text-lg text-gray-600 mb-6"
              >
                {mode === "extract" ? (
                  <>
                    An online image to text converter
                    <br />
                    to extract text from images.
                  </>
                ) : (
                  <>
                    Understand the content of your images
                    <br />
                    with AI-powered analysis.
                  </>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-3">
          <p className="text-xs text-gray-400">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
