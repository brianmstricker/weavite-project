import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import Sidemenu from "@/components/global/Sidemenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TopBar from "@/components/global/TopBar";

const geistSans = localFont({
 src: "./fonts/GeistVF.woff",
 variable: "--font-geist-sans",
 weight: "100 900",
});
const geistMono = localFont({
 src: "./fonts/GeistMonoVF.woff",
 variable: "--font-geist-mono",
 weight: "100 900",
});

export const metadata: Metadata = {
 title: "FastBuy",
 description: "Weavite project",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
     <SidebarProvider>
      <Sidemenu />
      <main className="flex-1 md:ml-16 p-4">
       <TopBar />
       {children}
      </main>
     </SidebarProvider>
    </ThemeProvider>
   </body>
  </html>
 );
}
