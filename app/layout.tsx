import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "400", "700", "900"] });


export const metadata: Metadata = {
  title: 'Abilify | Portfolio',
  description: 'Personal portfolio website showcasing my projects and skills',
  icons: {
    icon: '/logo.png'
  },
  metadataBase: new URL('https://www.abilify.my.id'),
  openGraph: {
    title: 'Abilify | Portfolio',
    description: 'Personal portfolio website showcasing my projects and skills',
    url: 'https://www.abilify.my.id',
    siteName: 'Abilify Portfolio',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
