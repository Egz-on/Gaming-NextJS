'use client';
import { AuthProvider } from '../hooks/useAuth';
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}