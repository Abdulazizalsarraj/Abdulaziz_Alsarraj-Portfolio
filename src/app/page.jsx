import HomeClient from '@/components/Home/HomeClient';

export const metadata = {
  title: 'Abdulaziz Alsarraj | Frontend Developer',
  description: 'Frontend Developer specializing in React, Next.js and modern web technologies. Crafting immersive web experiences with pixel-perfect implementation.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX', 'Web Development'],
  openGraph: {
    title: 'Abdulaziz Alsarraj | Frontend Developer',
    description: 'Frontend Developer crafting immersive web experiences with modern technologies.',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
