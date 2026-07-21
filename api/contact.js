import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = 'goldenboymoyo@gmail.com';
const PORTFOLIO_URL = 'https://bright-moyo-software-portfolio.vercel.app';

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const BM_LOGO_SVG = `<svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
  <path d="M34 4 L66 4 L96 34 L96 66 L66 96 L34 96 L4 66 L4 34 Z" stroke="#FFFFFF" stroke-width="1.5" opacity="0.35"/>
  <rect x="22" y="28" width="3.5" height="44" rx="1.75" fill="#FFFFFF"/>
  <path d="M22 28 H40 C47 28 50 32 50 36.5 C50 41 47 45 40 45 H22" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 50 H42 C50 50 54 55 54 61 C54 67 50 72 42 72 H22" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="22" y="46.5" width="32" height="3" rx="1.5" fill="#DC2626"/>
  <line x1="60" y1="72" x2="60" y2="42" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="78" y1="72" x2="78" y2="42" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
  <polyline points="60,42 69,30 78,42" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="69" y1="50" x2="69" y2="42" stroke="#DC2626" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
  <polygon points="50,10 53,14 50,18 47,14" fill="#DC2626" opacity="0.5"/>
</svg>`;

function ownerNotification({ name, email, message }) {
  const n = esc(name), e = esc(email), m = esc(message);
  const init = n.charAt(0).toUpperCase();
  const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="padding-bottom:32px;text-align:center;">${BM_LOGO_SVG}</td></tr>
  <tr><td style="padding-bottom:32px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:1px solid rgba(220,38,38,0.3);"></td></tr></table></td></tr>

  <tr><td style="padding-bottom:24px;" align="center">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:rgba(220,38,38,0.15);border:1px solid rgba(220,38,38,0.3);border-radius:20px;padding:8px 20px;">
        <span style="font-size:11px;font-weight:600;color:#DC2626;letter-spacing:2px;text-transform:uppercase;">New Message</span>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:36px;">

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="padding-bottom:4px;"><span style="font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">From</span></td></tr>
      <tr><td><table cellpadding="0" cellspacing="0"><tr>
        <td style="width:44px;height:44px;background:rgba(220,38,38,0.2);border-radius:50%;text-align:center;vertical-align:middle;padding-right:14px;">
          <span style="font-size:16px;font-weight:700;color:#DC2626;">${init}</span>
        </td>
        <td style="vertical-align:middle;">
          <div style="font-size:16px;font-weight:600;color:#FFFFFF;margin-bottom:2px;">${n}</div>
          <a href="mailto:${e}" style="font-size:13px;color:#DC2626;text-decoration:none;">${e}</a>
        </td>
      </tr></table></td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);"></td></tr></table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:20px;">
        <p style="margin:0;font-size:14px;color:#D1D5DB;line-height:1.75;white-space:pre-wrap;">${m}</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="background:#DC2626;border-radius:4px;">
          <a href="mailto:${e}?subject=Re: Portfolio Message" style="display:inline-block;padding:14px 40px;font-size:12px;font-weight:600;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Reply to ${n}</a>
        </td>
      </tr></table>
    </td></tr></table>

  </td></tr>

  <tr><td style="padding:20px 0 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px 36px;"><tr><td>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="width:50%;padding:4px 0;"><span style="font-size:11px;color:#6B7280;">Submitted:</span> <span style="font-size:12px;color:#D1D5DB;">${now}</span></td>
        <td style="width:50%;padding:4px 0;" align="right"><span style="font-size:11px;color:#6B7280;">Via:</span> <span style="font-size:12px;color:#D1D5DB;">Portfolio Contact Form</span></td>
      </tr></table>
    </td></tr></table>
  </td></tr>

  <tr><td style="padding:32px 0 0 0;text-align:center;">
    <p style="margin:0 0 8px 0;font-size:12px;color:#6B7280;">This message was sent through your portfolio contact form.</p>
    <p style="margin:0;font-size:11px;color:#4B5563;">&copy; 2026 Bright Moyo &bull; goldenboymoyo@gmail.com</p>
  </td></tr>

</table></td></tr></table></body></html>`;
}

function autoReply({ name, message }) {
  const n = esc(name), m = esc(message);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="padding-bottom:32px;text-align:center;">${BM_LOGO_SVG}</td></tr>
  <tr><td style="padding-bottom:32px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:1px solid rgba(220,38,38,0.3);"></td></tr></table></td></tr>

  <tr><td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:40px 36px;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:8px;"><span style="font-size:11px;font-weight:600;color:#DC2626;letter-spacing:3px;text-transform:uppercase;">Message Received</span></td></tr>
      <tr><td style="padding-bottom:20px;"><h1 style="margin:0;font-size:26px;font-weight:700;color:#FFFFFF;line-height:1.3;">Thanks for reaching out, ${n}!</h1></td></tr>
      <tr><td style="padding-bottom:32px;">
        <p style="margin:0;font-size:15px;color:#9CA3AF;line-height:1.7;">I've received your message and will get back to you within <strong style="color:#FFFFFF;">24 hours</strong>.</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,0.06);"></td></tr></table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">Your Message</span></td></tr>
      <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#D1D5DB;line-height:1.7;white-space:pre-wrap;">${m}</p>
      </td></tr>
    </table>

  </td></tr>

  <tr><td style="padding:32px 0 0 0;text-align:center;">
    <p style="margin:0 0 8px 0;font-size:12px;color:#6B7280;">Bright Moyo &mdash; Software Developer &amp; Digital Marketer</p>
    <p style="margin:0;font-size:11px;color:#4B5563;">Victoria Falls, Zimbabwe</p>
  </td></tr>

</table></td></tr></table></body></html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email, and message are required.' });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ message: 'Server misconfigured: RESEND_API_KEY is not set.' });

  let ownerSent = false;

  try {
    await resend.emails.send({
      from: 'Bright Moyo <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `[Portfolio] ${name} sent you a message`,
      html: ownerNotification({ name, email, message }),
      reply_to: email,
    });
    ownerSent = true;
  } catch (err) {
    console.error('Owner notification failed:', err);
  }

  try {
    await resend.emails.send({
      from: 'Bright Moyo <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for reaching out!',
      html: autoReply({ name, message }),
    });
  } catch (err) {
    console.error('Auto-reply failed:', err);
  }

  if (!ownerSent) {
    return res.status(500).json({ message: 'Failed to send notification. Please try again.' });
  }

  return res.status(200).json({ message: 'Emails sent successfully.' });
}
