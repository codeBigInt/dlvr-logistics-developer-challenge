import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/custom-components/PageLayout";


const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
export const metadata: Metadata = {
  title: "DLVR logistics",
  description: "Logistics Booking Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageLayout poppins={poppins}>{children}</PageLayout>
}
