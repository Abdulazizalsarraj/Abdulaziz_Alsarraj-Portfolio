import ProjectsClient from '@/components/Projects/ProjectsClient';
import projectsData from '@/data/projects';

export const metadata = {
  title: 'Projects',
  description: 'A curated collection of frontend projects including AI apps, e-commerce platforms, dashboards and more built with React, Next.js and TypeScript.',
  keywords: ['Frontend Projects', 'React Projects', 'Next.js', 'TypeScript', 'Portfolio', 'Web Apps'],
  openGraph: {
    title: 'Projects | Abdulaziz Alsarraj',
    description: 'A curated collection of featured web development projects showcasing innovation and technical excellence.',
  },
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projectsData} />;
}
