import AboutClient from '@/components/About/AboutClient';

export const metadata = {
  title: 'About',
  description: 'Learn about Abdulaziz Alsarraj — a Frontend Developer with expertise in React, Next.js, TypeScript, and modern web technologies.',
  keywords: ['About', 'Skills', 'React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
  openGraph: {
    title: 'About | Abdulaziz Alsarraj',
    description: 'Frontend Developer with expertise in React, Next.js, TypeScript, and modern web technologies.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
