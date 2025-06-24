import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto py-4 text-center text-sm text-gray-500">
      <p>
        Built by{" "}
        <a
          href="https://abdulqudus.com"
          className="underline"
          target="_blank"
        >
          Jide
        </a>
        . Powered by{" "}
        <a href="https://together.ai" className="underline" target="_blank">
          Together.ai
        </a>{" "}
        &{" "}
        <a href="https://www.llama.com/" className="underline" target="_blank">
          Llama 4
        </a>
        .
      </p>
    </footer>
  );
};
