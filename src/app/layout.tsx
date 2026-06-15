import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "okta.asion.ai Agent Identity Firewall",
  description:
    "Okta-style AI agent identity firewall demo for governed access, approvals, and audit evidence.",
  icons: {
    icon: "/brand/okta-logo-carbon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-background antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
