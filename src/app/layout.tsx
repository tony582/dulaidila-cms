import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata = {
  title: "dulaidila | Only the Paranoid Survive",
  description: "Independent Studio & Tony Jin's Geek Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="layout-wrapper">
          <Navbar />
          <main className="main-content" style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
