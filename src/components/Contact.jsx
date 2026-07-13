import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';
import SocialLinks from './SocialLinks.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    e.target.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <div className="contact-reveal font-body text-xs tracking-[0.3em] text-crimson uppercase mb-4">Get In Touch</div>
          <h2 className="contact-reveal font-display text-3xl md:text-4xl text-ink mb-6">Let's Build Something</h2>
          <p className="contact-reveal text-muted leading-relaxed mb-10 max-w-md">
            Have a project in mind, or just want to talk shop? I usually reply within a day.
          </p>

          <div className="contact-reveal flex items-center gap-4 mb-8">
            <img src={profileImg} alt="Bright Moyo" loading="lazy" className="w-14 h-14 rounded-full object-cover border border-crimson/30" />
            <div>
              <div className="text-ink font-display">Bright Moyo</div>
              <div className="text-xs text-muted uppercase tracking-widest">Software Developer</div>
            </div>
          </div>

          <div className="contact-reveal space-y-5 mb-10">
            <a href="mailto:goldenboymoyo@gmail.com" className="flex items-center gap-4 group" data-cursor-hover>
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors"><FiMail /></span>
              <span className="text-ink/90 group-hover:text-crimson transition-colors">goldenboymoyo@gmail.com</span>
            </a>
            <a href="tel:+263774765928" className="flex items-center gap-4 group" data-cursor-hover>
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-crimson group-hover:bg-crimson group-hover:text-white transition-colors"><FiPhone /></span>
              <span className="text-ink/90 group-hover:text-crimson transition-colors">+263 774 765 928</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-crimson"><FiMapPin /></span>
              <span className="text-ink/90">Victoria Falls, Zimbabwe</span>
            </div>
          </div>

          <div className="contact-reveal">
            <SocialLinks size="md" variant="outline" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-reveal glass border border-white/10 p-8 space-y-5" aria-label="Contact form">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-muted mb-2">Name</label>
              <input id="contact-name" name="name" required type="text" autoComplete="name" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-muted mb-2">Email</label>
              <input id="contact-email" name="email" required type="email" autoComplete="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-xs uppercase tracking-widest text-muted mb-2">Subject</label>
              <input id="contact-subject" name="subject" required type="text" autoComplete="off" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors" />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-muted mb-2">Message</label>
            <textarea id="contact-message" name="message" required rows="5" autoComplete="off" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors resize-none" />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-crimson text-white py-4 text-xs uppercase tracking-[0.12em] font-medium hover:bg-white hover:text-base transition-colors duration-300"
            data-cursor-hover
          >
            <FiSend size={14} /> {sent ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
