import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send Verification Email
export const sendVerificationEmail = async (user, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    text: `Please verify your email by clicking on this link: ${verificationLink}`
  };
  await transporter.sendMail(mailOptions);
};

// Send Reset Password Email
export const sendResetPasswordEmail = async (user, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/api/auth/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Reset your password',
    text: `Reset your password by clicking on this link: ${resetLink}`
  };
  await transporter.sendMail(mailOptions);
};

// Send OTP Email
export const sendOtpEmail = async (user, otp) => {
  const otpLink = `${process.env.FRONTEND_URL}/verify-otp`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. Please enter this code on the verification page: ${otpLink}`
  };
  await transporter.sendMail(mailOptions);
};

// Send Contact Form Email
export const sendContactEmail = async (name, email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send the message to yourself
    subject: `New Contact Form Message from ${name}`,
    text: `You received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };
  await transporter.sendMail(mailOptions);
};
