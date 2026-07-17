import { useState, Suspense, lazy } from 'react';
import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import FloatingDock from './components/FloatingDock.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Footer from './components/Footer.jsx';
import ChatBot from './components/ChatBot.jsx';
import useLenis from './hooks/useLenis.js';

const Projects = lazy(() => import('./components/Projects.jsx'));
const Experience = lazy(() => import('./components/Experience.jsx'));
const Journey = lazy(() => import('./components/Journey.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar />
      <FloatingDock />
      <main>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={null}>
          <Projects />
          <Experience />
          <Journey />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
