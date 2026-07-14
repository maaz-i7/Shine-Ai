import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: "Shine Ai",
  description: "AI assisted coding platform",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="min-h-full bg-primary font-sans flex flex-col relative">
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
