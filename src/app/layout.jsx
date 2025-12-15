import Navbar from '@/components/Navbar';
import './globals.css';
import { Gabarito } from "next/font/google";

const gabarito = Gabarito ({subsets: ['latin']});

export const metadata = {
  title: 'OtakuList',
  description: 'Your Gateway to Anime',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-gray-900`}suppressHydrationWarning={true}>
        <Navbar />
        <div className="px-4 md:px-8 max-w-6xl mx-auto"></div>
        {children}
      </body>
    </html>
  );
}
