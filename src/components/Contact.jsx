import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle, FiGithub, FiLinkedin } from 'react-icons/fi';
import Logo from './Logo.jsx';
import SocialLinks from './SocialLinks.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending || sent) return;

    setSending(true);
    setError('');

    try {
      const form = formRef.current;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      setSenderName(data.name || '');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 6000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Something went wrong. Please try again or email me directly at goldenboymoyo@gmail.com');
    } finally {
      setSending(false);
    }
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
            <Logo size={56} className="text-ink shrink-0" />
            <div>
              <div className="text-ink font-display">Bright Moyo</div>
              <div className="text-xs text-muted uppercase tracking-widest">Software Developer &amp; Digital Marketer</div>
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-reveal glass border border-white/10 p-8 space-y-6"
          aria-label="Contact form"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">Name</label>
              <input id="contact-name" name="name" required type="text" autoComplete="name" placeholder="Enter your full name" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors placeholder:text-muted/50" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">Email</label>
              <input id="contact-email" name="email" required type="email" autoComplete="email" placeholder="Enter your email address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors placeholder:text-muted/50" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">Message</label>
            <textarea id="contact-message" name="message" required rows="5" autoComplete="off" placeholder="Write your message here..." className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink outline-none focus:border-crimson transition-colors resize-none placeholder:text-muted/50" />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded">
              <FiAlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass border border-white/10 p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-crimson/15 border border-crimson/30 flex items-center justify-center">
                  <FiCheck size={24} className="text-crimson" />
                </div>
                <h3 className="font-display text-lg text-ink mb-1">Message Sent!</h3>
                <p className="text-sm text-muted mb-5">
                  Thanks {senderName.split(' ')[0] || 'there'}! I'll get back to you within 24 hours.
                </p>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <p className="text-xs text-muted mb-3 uppercase tracking-wider">While you wait, check out my work</p>
                  <a
                    href="https://bright-moyo-software-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-crimson text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium hover:opacity-80 transition-opacity"
                    data-cursor-hover
                  >
                    View Portfolio
                  </a>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <a href="https://github.com/goldenboymoyo-gif" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-crimson transition-colors" data-cursor-hover aria-label="GitHub">
                    <FiGithub size={18} />
                  </a>
                  <a href="https://linkedin.com/in/bright-moyo-8728b83ab" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-crimson transition-colors" data-cursor-hover aria-label="LinkedIn">
                    <FiLinkedin size={18} />
                  </a>
                  <a href="mailto:goldenboymoyo@gmail.com" className="text-muted hover:text-crimson transition-colors" data-cursor-hover aria-label="Email">
                    <FiMail size={18} />
                  </a>
                </div>

                <p className="text-xs text-muted/60 mt-4">A confirmation has been sent to your email</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 bg-crimson text-white py-4 text-xs uppercase tracking-[0.12em] font-medium hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            data-cursor-hover
          >
            <FiSend size={14} /> {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
