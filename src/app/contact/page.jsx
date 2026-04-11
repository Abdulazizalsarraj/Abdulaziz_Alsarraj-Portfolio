import ContactClient from '@/components/Contact/ContactClient';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Abdulaziz Alsarraj — available for freelance projects, collaborations, and new opportunities.',
  keywords: ['Contact', 'Hire', 'Freelance', 'Collaboration', 'Email', 'Frontend Developer'],
  openGraph: {
    title: 'Contact | Abdulaziz Alsarraj',
    description: 'Available for freelance projects, collaborations, and new opportunities.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
