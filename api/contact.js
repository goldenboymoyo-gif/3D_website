import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = 'goldenboymoyo@gmail.com';
const PORTFOLIO_URL = 'https://bright-moyo-software-portfolio.vercel.app';

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ownerNotification({ name, email, message }) {
  const n = esc(name), e = esc(email), m = esc(message);
  const init = n.charAt(0).toUpperCase();
  const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Logo -->
  <tr><td style="padding-bottom:32px;text-align:center;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>
      <td style="width:56px;height:56px;border:2px solid #DC2626;transform:rotate(45deg);text-align:center;vertical-align:middle;">
        <div style="transform:rotate(-45deg);font-size:18px;font-weight:700;color:#DC2626;letter-spacing:2px;">BM</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Red divider -->
  <tr><td style="padding-bottom:32px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:1px solid rgba(220,38,38,0.3);"></td></tr></table></td></tr>

  <!-- Badge -->
  <tr><td style="padding-bottom:24px;" align="center">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:rgba(220,38,38,0.15);border:1px solid rgba(220,38,38,0.3);border-radius:20px;padding:8px 20px;">
        <span style="font-size:11px;font-weight:600;color:#DC2626;letter-spacing:2px;text-transform:uppercase;">New Message</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- Main card -->
  <tr><td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:36px;">

    <!-- Sender -->
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

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);"></td></tr></table>

    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:20px;">
        <p style="margin:0;font-size:14px;color:#D1D5DB;line-height:1.75;white-space:pre-wrap;">${m}</p>
      </td></tr>
    </table>

    <!-- Reply button -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="background:#DC2626;border-radius:4px;">
          <a href="mailto:${e}?subject=Re: Portfolio Message" style="display:inline-block;padding:14px 40px;font-size:12px;font-weight:600;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Reply to ${n}</a>
        </td>
      </tr></table>
    </td></tr></table>

  </td></tr>

  <!-- Meta -->
  <tr><td style="padding:20px 0 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px 36px;"><tr><td>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="width:50%;padding:4px 0;"><span style="font-size:11px;color:#6B7280;">Submitted:</span> <span style="font-size:12px;color:#D1D5DB;">${now}</span></td>
        <td style="width:50%;padding:4px 0;" align="right"><span style="font-size:11px;color:#6B7280;">Via:</span> <span style="font-size:12px;color:#D1D5DB;">Portfolio Contact Form</span></td>
      </tr></table>
    </td></tr></table>
  </td></tr>

  <!-- Footer -->
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

  <!-- Logo -->
  <tr><td style="padding-bottom:32px;text-align:center;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>
      <td style="width:56px;height:56px;border:2px solid #DC2626;transform:rotate(45deg);text-align:center;vertical-align:middle;">
        <div style="transform:rotate(-45deg);font-size:18px;font-weight:700;color:#DC2626;letter-spacing:2px;">BM</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Red divider -->
  <tr><td style="padding-bottom:32px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-bottom:1px solid rgba(220,38,38,0.3);"></td></tr></table></td></tr>

  <!-- Main card -->
  <tr><td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:40px 36px;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:8px;"><span style="font-size:11px;font-weight:600;color:#DC2626;letter-spacing:3px;text-transform:uppercase;">Message Received</span></td></tr>
      <tr><td style="padding-bottom:20px;"><h1 style="margin:0;font-size:26px;font-weight:700;color:#FFFFFF;line-height:1.3;">Thanks for reaching out, ${n}!</h1></td></tr>
      <tr><td style="padding-bottom:32px;">
        <p style="margin:0;font-size:15px;color:#9CA3AF;line-height:1.7;">I've received your message and will get back to you within <strong style="color:#FFFFFF;">24 hours</strong>. In the meantime, feel free to explore my work or connect with me on social media.</p>
      </td></tr>
    </table>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:32px;" align="center">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="background:#DC2626;border-radius:4px;">
          <a href="${PORTFOLIO_URL}" target="_blank" style="display:inline-block;padding:14px 40px;font-size:12px;font-weight:600;color:#FFFFFF;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">View Portfolio</a>
        </td>
      </tr></table>
    </td></tr></table>

    <!-- Divider -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,0.06);"></td></tr></table>

    <!-- Their message -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:12px;"><span style="font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">Your Message</span></td></tr>
      <tr><td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#D1D5DB;line-height:1.7;white-space:pre-wrap;">${m}</p>
      </td></tr>
    </table>

  </td></tr>

  <!-- Social -->
  <tr><td style="padding:20px 0 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px 36px;">
      <tr><td style="padding-bottom:16px;"><span style="font-size:11px;font-weight:600;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">Stay Connected</span></td></tr>
      <tr><td><table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="33%" style="padding:8px 0;" align="center"><a href="mailto:goldenboymoyo@gmail.com" style="text-decoration:none;"><table cellpadding="0" cellspacing="0"><tr><td style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.15);border-radius:50%;text-align:center;vertical-align:middle;"><span style="font-size:16px;color:#DC2626;">&#9993;</span></td></tr></table><div style="font-size:11px;color:#9CA3AF;margin-top:6px;">Email</div></a></td>
        <td width="33%" style="padding:8px 0;" align="center"><a href="https://github.com/goldenboymoyo-gif" target="_blank" style="text-decoration:none;"><table cellpadding="0" cellspacing="0"><tr><td style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.15);border-radius:50%;text-align:center;vertical-align:middle;"><span style="font-size:16px;color:#DC2626;">GH</span></td></tr></table><div style="font-size:11px;color:#9CA3AF;margin-top:6px;">GitHub</div></a></td>
        <td width="33%" style="padding:8px 0;" align="center"><a href="https://linkedin.com/in/bright-moyo-8728b83ab" target="_blank" style="text-decoration:none;"><table cellpadding="0" cellspacing="0"><tr><td style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.15);border-radius:50%;text-align:center;vertical-align:middle;"><span style="font-size:16px;color:#DC2626;">in</span></td></tr></table><div style="font-size:11px;color:#9CA3AF;margin-top:6px;">LinkedIn</div></a></td>
      </tr></table></td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:32px 0 0 0;text-align:center;">
    <p style="margin:0 0 8px 0;font-size:12px;color:#6B7280;">Bright Moyo &mdash; Software Developer &amp; Digital Marketer</p>
    <p style="margin:0 0 4px 0;font-size:11px;color:#4B5563;">Victoria Falls, Zimbabwe &bull; +263 774 765 928</p>
    <p style="margin:0;font-size:11px;color:#4B5563;">&copy; 2026 All rights reserved.</p>
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

  try {
    await resend.emails.send({
      from: 'Bright Moyo <onboarding@resend.dev>',
      to: OWNER_EMAIL,
      subject: `[Portfolio] ${name} sent you a message`,
      html: ownerNotification({ name, email, message }),
      reply_to: email,
    });

    await resend.emails.send({
      from: 'Bright Moyo <onboarding@resend.dev>',
      to: email,
      subject: 'Thanks for reaching out!',
      html: autoReply({ name, message }),
    });

    return res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }
}
