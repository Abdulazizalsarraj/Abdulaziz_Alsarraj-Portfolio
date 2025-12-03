/** @format */

import image1 from "../assets/images/MergedImages.png";
import image2 from "../assets/images/MergedImages (2).png";
import image3 from "../assets/images/Screenshot (228).png";
import image4 from "../assets/images/Screenshot (188).png";
import image5 from "../assets/images/remoter-interview.png";
import image6 from "../assets/images/AI Fitness Trainer.png";
import image7 from "../assets/images/tek-img.jpg";
const projects = [
  {
    title: "AI Fitness Trainer",
    tech: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Convex",
      "Tailwind CSS",
      "Shadcn/UI",
      "Vapi",
      "Gemini AI",
    ],
    description:
      "AI Fitness Trainer — Innovative web application leveraging Next.js, Tailwind CSS, shadcn, Clerk, Convex and Vapi to deliver an AI-powered personal training experience. Users connect via real-time voice calls with a smart coach that analyzes goals, fitness level and dietary preferences to generate tailored workout regimens and meal plans. Secure authentication, scalable data management and a responsive UI ensure a seamless, personalized journey toward optimal health and performance.",
    image: image6,
    link: "https://ai-fitness-trainer-six.vercel.app/",
    year: 2025,
  },
  {
    title: "Remote Interviews Platform",
    tech: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "Convex",
      "Tailwind CSS",
      "Shadcn/UI",
      "Stream Video SDK",
      "monaco-editor",
    ],
    description:
      "Next.js remote interview platform with real-time video, code editor, Clerk Authentication & Convex DB and analytics",
    image: image5,
    link: "https://remote-interview-platform-taupe.vercel.app/",
    year: 2025,
  },
  {
    title: "E-Commerce Platform",
    tech: [
      "React.js",
      "Stripe",
      "chart.js",
      "three.js",
      "firebase",
      "framer-motion",
      "Redux",
      "Tailwind CSS",
    ],
    description:
      "A sleek E-commerce platform with dynamic 3D visuals, real-time analytics, smooth animations, secure payments, and a seamless shopping experience.",
    image: image1,
    link: "https://e-commerce-six-gamma-65.vercel.app/",
    year: 2025,
  },
  {
    title: "Admin Dashboard",
    tech: ["React.js", "recharts", "Tailwind CSS", "Framer-motion"],
    description: "An Interactive Admin analytics dashboard",
    image: image2,
    link: "https://react-admin-dashboard-zeta-tan.vercel.app/",
  },
  {
    title: "LinkedIn Clone",
    tech: ["React.js", "Redux", "Styled-Components", "Firebase"],
    description:
      "A LinkedIn clone with user authentication, posts, likes, comments, and real-time updates for a seamless professional networking experience.",
    image: image3,
    link: "https://linked-in-app-fawn.vercel.app/",
  },
  {
    title: "Company Website & Learning Platform",
    tech: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "React Hook Form",
      "i18next",
      "Framer Motion",
      "Axios",
      "React Router",
    ],
    description:
      "A comprehensive company website showcasing services, projects, and an integrated learning platform. Features dynamic course catalogs, enrollment system, video playlists with Plyr player, multi-language support, and responsive animations for enhanced user engagement.",
    image: image7,
    link: "https://teknova-sy.com",
    year: 2025,
  },
  {
    title: "Recipe Finder App ",
    tech: ["React.js", "Tailwind CSS", "Context API", "React Router"],
    description:
      "A user-friendly app to search and discover recipes based on ingredients and preferences.",
    image: image4,
    link: "https://recipe-finder-app-dun.vercel.app/",
  },
];

export default projects;
