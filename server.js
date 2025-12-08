
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

async function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({ host, port: port ?? 465, secure: secure ?? true, auth: { user, pass } });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({ host: 'smtp.ethereal.email', port: 587, secure: false, auth: { user: testAccount.user, pass: testAccount.pass } });
}

app.post('/contact', async (req, res) => {
  const { nom, email, message } = req.body || {};
  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants.' });
  }
  try {
    const transporter = await getTransporter();
    const to = process.env.CONTACT_TO || 'nunodecaldasgomes@icloud.com';
    const info = await transporter.sendMail({
      from: `Portfolio Contact <no-reply@portfolio.local>`,
      to,
      subject: `Nouveau message de ${nom}`,
      replyTo: email,
      text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    const preview = nodemailer.getTestMessageUrl(info);
    res.json({ ok: true, preview });
  } catch (err) {
    res.status(500).json({ error: 'Impossible d\'envoyer l\'email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

