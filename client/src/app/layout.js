import localFont from 'next/font/local'

const googleSans = localFont({
  src: '../../public/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf',
  variable: '--font-google-sans',
});

import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: "Shine AI",
  description: "AI assisted coding platform",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="font-sans min-h-full flex flex-col relative">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
