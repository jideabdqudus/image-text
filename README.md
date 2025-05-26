# Image Text Solutions 🖼️🔍

A modern web application that extracts text from images and analyzes image content using AI. Built with Next.js and powered by Together AI.

## 🌐 Visit Live Site

- https://imagetext.solutions

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jideabdqudus/image-text.git
cd image-text
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Together AI API key to `.env.local`:

```
TOGETHER_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Features

### Text Extraction

- Upload images via drag & drop or file selection
- Extract text from any image with a single click
- View extracted text with proper formatting

### Image Analysis

- Switch between Text Extraction and Image Analysis modes
- Get detailed AI-powered descriptions of image content
- Understand what's in your images instantly

## 💻 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **API**: Next.js API routes
- **AI**: Together AI (Llama 3.3)
- **UI Components**: Shadcn UI

## 🔒 Privacy

Your privacy is important! This application:

- Does not store your images or analysis results
- Does not transmit data beyond what's needed for processing
- Processes everything securely through server-side API calls

## 📝 License

This project is licensed under the MIT License.
