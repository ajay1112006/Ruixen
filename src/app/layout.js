import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import LineWaves from "@/components/LineWaves";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Ruixen | Next-Gen Web Development Agency",
  description: "Ruixen builds high-performance, visually striking digital experiences for the modern web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body style={{ fontFamily: 'var(--font-outfit)' }}>
        <LineWaves
          speed={0.15}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={0.6}
          rotation={-45}
          edgeFadeWidth={0.0}
          colorCycleSpeed={1.0}
          brightness={0.15}
          color1="#0800ff"
          color2="#00d0ff"
          color3="#ff00aa"
          enableMouseInteraction={true}
          mouseInfluence={2.0}
        />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <footer style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center', 
          borderTop: '1px solid var(--surface-border)',
          marginTop: '4rem'
        }}>
          <p style={{ opacity: 0.5 }}>© {new Date().getFullYear()} Ruixen Agency. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
