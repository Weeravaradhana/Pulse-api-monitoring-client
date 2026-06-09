import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import {Providers} from "@/app/providers";

export const metadata: Metadata = {
  title: "UptimeIQ — API Monitoring & Analytics",
  description:
      "Enterprise-grade API monitoring, uptime tracking, and analytics for modern teams.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
      <Providers>
      {children}
      </Providers>
      </body>
      </html>
  );
}