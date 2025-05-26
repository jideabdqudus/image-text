"use client";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { ImageToTextIntro } from "@/src/components/image-to-text-intro";
import { ImageExtractionPanel } from "@/src/components/extraction-panel";
import { useImageExtractor } from "@/src/lib/hooks/useImage";

export default function Home() {
  const imageExtractor = useImageExtractor();

  return (
    <div className="flex flex-col min-h-screen px-6 md:px-8 lg:px-48">
      <Header />
      <main className="container mx-auto flex-1 flex items-center justify-center py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          <ImageToTextIntro mode={imageExtractor.mode} />
          <ImageExtractionPanel {...imageExtractor} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
