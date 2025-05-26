import { ReactNode } from "react";
import { siteName } from "@/config";
import { generateMetadata } from "@/src/lib/utils";

export const metadata = generateMetadata({
  title: siteName,
  keywords: ["Image analysis", "Image extraction"],
  description: "Image analysis and insights.",
});

export default function MainLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
