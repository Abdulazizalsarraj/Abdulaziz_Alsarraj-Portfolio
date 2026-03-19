import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, Component } from 'react';
import Navbar from './Components/Navbar/Navbar';

const Home = lazy(() => import('./Components/Home/Home'));
const Projects = lazy(() => import('./Components/Projects/Projects'));
const About = lazy(() => import('./Components/About/About'));
const Contact = lazy(() => import('./Components/Contact/Contact'));

// Skeleton page loader — matches real page structure to avoid layout flash
const PageLoader = () => (
  <div className="min-h-screen bg-primary">
    <div className="fixed top-0 w-full h-16 bg-secondary/80 backdrop-blur-md border-b border-teal-400/10 animate-pulse z-50" />
    <div className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-5">
          <div className="h-4 w-28 bg-secondary/80 rounded-full animate-pulse" />
          <div className="h-14 w-3/4 bg-secondary/80 rounded-xl animate-pulse" />
          <div className="h-8 w-1/2 bg-secondary/60 rounded-xl animate-pulse" />
          <div className="h-20 w-full bg-secondary/40 rounded-xl animate-pulse" />
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-teal-400/20 rounded-2xl animate-pulse" />
            <div className="h-12 w-36 bg-secondary/60 rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="w-64 h-64 rounded-full bg-secondary/60 animate-pulse shrink-0" />
      </div>
    </div>
  </div>
);

// Error boundary — prevents blank screen on chunk load failure
class PageErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary gap-6 px-6">
          <div className="text-center space-y-4">
            <p className="text-3xl font-bold text-teal-400">Something went wrong</p>
            <p className="text-gray-400 max-w-sm">Failed to load this page. Please try again.</p>
          </div>
          <button
            className="px-8 py-3 bg-teal-400/20 border border-teal-400/40 rounded-2xl text-white font-semibold hover:bg-teal-400/30 transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const withNav = (Component) => (
  <PageErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Navbar />
      <Component />
    </Suspense>
  </PageErrorBoundary>
);

const router = createBrowserRouter([
  { path: "/",        element: withNav(Home) },
  { path: "/home",    element: withNav(Home) },
  { path: "/projects",element: withNav(Projects) },
  { path: "/about",   element: withNav(About) },
  { path: "/contact", element: withNav(Contact) },
]);

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-primary text-gray-200">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
