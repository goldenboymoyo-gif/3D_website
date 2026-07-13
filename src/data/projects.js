import televiviImg from '../assets/vicfalls_televivi.png';
import ironvaleImg from '../assets/ironvale.png';
import homelinkImg from '../assets/homelink.png';
import vfbaImg from '../assets/vfba.png';
import softwarePortImg from '../assets/software_port.png';
import briefwireImg from '../assets/briefwire.png';
import digitalPortImg from '../assets/digital_port.png';
import alyssaImg from '../assets/alyssa.png';

export const PROJECTS = [
  {
    id: 'televivi',
    title: 'Vic Falls TeleVivi',
    category: 'Tourism Website',
    live: 'https://vic-falls-televivi.vercel.app/',
    github: null,
    image: televiviImg,
    description: 'A modern tourism platform showcasing Victoria Falls through engaging storytelling, destination highlights, multimedia content, and responsive design.',
    tech: ['React', 'Tailwind CSS', 'GSAP', 'Vercel'],
  },
  {
    id: 'ironvale',
    title: 'Ironvale Construction',
    category: 'Construction Company Website',
    live: 'https://ironvale-sonstruction.vercel.app/',
    github: null,
    image: ironvaleImg,
    description: 'A professional construction company website featuring premium branding, modern layouts, responsive sections, service showcases, and contact functionality.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
  },
  {
    id: 'homelink',
    title: 'HomeLink',
    category: 'Real Estate Platform',
    live: 'https://homelink-one.vercel.app/',
    github: null,
    image: homelinkImg,
    description: 'A modern real estate website designed to help users browse and discover properties through an intuitive interface and engaging user experience.',
    tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'vfba',
    title: 'Victoria Falls Boxing Academy Attendance System',
    category: 'Gym Management System',
    live: 'https://vfba-attendance.vercel.app/',
    github: null,
    image: vfbaImg,
    description: 'A boxer attendance management system that allows coaches and athletes to manage attendance, schedules, notifications, and training activities.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    highlights: ['Check In', 'Check Out', 'Notifications', 'Attendance Tracking', 'Training Schedule', 'Coach Dashboard'],
  },
  {
    id: 'devportfolio',
    title: 'Software Developer Portfolio',
    category: 'Portfolio',
    live: 'https://bright-moyo-software-portfolio.vercel.app/',
    github: null,
    image: softwarePortImg,
    description: 'A modern developer portfolio presenting my journey, projects, skills, and passion for software engineering.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'briefwire',
    title: 'Brief Wire',
    category: 'News Application',
    live: 'https://brief-wire.vercel.app/',
    github: null,
    image: briefwireImg,
    description: 'A news application that delivers current headlines through a clean, responsive interface powered by a news API.',
    tech: ['React', 'News API', 'Tailwind CSS'],
  },
  {
    id: 'digitalport',
    title: 'Digital Portfolio',
    category: 'Portfolio Website',
    live: 'https://digital-port-bright.vercel.app/',
    github: null,
    image: digitalPortImg,
    description: 'A personal digital portfolio showcasing projects, technical skills, and frontend development capabilities.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'alyssa',
    title: 'Alyssa Personal Space',
    category: 'Personal Website',
    live: 'https://alyssapersonalspace.vercel.app/',
    github: null,
    image: alyssaImg,
    description: 'A modern personal brand website with elegant layouts, storytelling, and responsive interactions.',
    tech: ['React', 'Tailwind CSS'],
  },
];
