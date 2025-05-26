import { ReactNode } from "react";
import { siteName } from "@/config";
import { generateMetadata } from "@/src/lib/utils";
import { GoogleTagManager } from "@/src/components/google-tag-manager";

export const metadata = generateMetadata({
  title: siteName,
  keywords: ["Image analysis", "Image extraction"],
  description: "Image analysis and insights.",
});

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      <div>{children}</div>
    </>
  );
}
