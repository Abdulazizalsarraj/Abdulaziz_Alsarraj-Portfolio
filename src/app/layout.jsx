import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata = {
  metadataBase: new URL('https://abdulazizalsarraj.dev'),
  title: {
    default: 'Abdulaziz Alsarraj | Frontend Developer',
    template: '%s | Abdulaziz Alsarraj',
  },
  description: 'Frontend Developer specializing in React, Next.js and modern web technologies. Crafting immersive web experiences with pixel-perfect implementation.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX', 'Web Development'],
  authors: [{ name: 'Abdulaziz Alsarraj' }],
  creator: 'Abdulaziz Alsarraj',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Abdulaziz Alsarraj Portfolio',
    title: 'Abdulaziz Alsarraj | Frontend Developer',
    description: 'Frontend Developer crafting immersive web experiences with modern technologies.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
  other: {
    'theme-color': '#0a0a0a',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-primary text-gray-200 font-sans" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
