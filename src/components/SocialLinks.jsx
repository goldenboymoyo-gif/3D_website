import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/goldenboymoyo-gif', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bright-moyo-8728b83ab', icon: FiLinkedin },
  { label: 'Email', href: 'mailto:goldenboymoyo@gmail.com', icon: FiMail },
  { label: 'Phone', href: 'tel:+263774765928', icon: FiPhone },
];

/**
 * size: 'sm' | 'md' | 'lg' — controls icon button dimensions
 * variant: 'default' | 'outline' | 'ghost'
 */
export default function SocialLinks({ size = 'md', variant = 'outline', className = '' }) {
  const dims = { sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-12 h-12 text-lg' }[size];
  const variantClass = {
    default: 'bg-crimson text-white hover:bg-white hover:text-base',
    outline: 'border border-white/15 text-ink hover:border-crimson hover:text-crimson hover:-translate-y-1',
    ghost: 'text-muted hover:text-crimson hover:-translate-y-1',
  }[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith('http') ? '_blank' : undefined}
          rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={s.label}
          data-cursor-hover
          className={`${dims} ${variantClass} rounded-full flex items-center justify-center transition-all duration-300`}
        >
          <s.icon />
        </a>
      ))}
    </div>
  );
}
