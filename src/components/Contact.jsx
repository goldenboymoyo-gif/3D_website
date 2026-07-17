import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Logo from './Logo.jsx';
import SocialLinks from './SocialLinks.jsx';

gsap.registerPlugin(ScrollTrigger);

const FORMSUBMIT_EMAIL = 'goldenboymoyo@gmail.com';

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

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
      data.subject = `[Portfolio] ${data.subject || 'New Message'}`;

      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success !== false) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 6000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('FormSubmit error:', err);
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
          action={`https://formsubmit.co/${FORMSUBMIT_EMAIL}`}
          method="POST"
          className="contact-reveal glass border border-white/10 p-8 space-y-5"
          aria-label="Contact form"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="[Portfolio] New Message" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="" />

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

          {error && (
            <div className="flex items-start gap-2 text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded">
              <FiAlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {sent && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-3 rounded">
              <FiCheck size={14} /> Message sent successfully! Thank you for reaching out — I'll reply soon.
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 bg-crimson text-white py-4 text-xs uppercase tracking-[0.12em] font-medium hover:bg-white hover:text-base transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            data-cursor-hover
          >
            <FiSend size={14} /> {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
