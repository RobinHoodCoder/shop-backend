import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div class="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>

      <p>😘, Robin</p>
    </div>
  `;
}

export async function sendPasswordResetEmail({ resetToken, to }) {
  // email the user a tokenc
  console.log(resetToken, to);
  const info = (await transport.sendMail({
    to,
    from: 'info@sickfits.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${to}">Click Here to reset</a>
    `),
  }));
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
