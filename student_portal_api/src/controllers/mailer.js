import nodemailer from "nodemailer";

const from = '"Student_Portal" <info@dci.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Registration Confirmation",
    text: 
    `Dear ${user.firstName},

    Thank you again for your registration with DCI Students Book.
    
    Your profile has been verified and you now have access to complete the requested information.
    
    Edit your profile here ${user.generateConfirmationUrl()}


    Best regards,
    DCI-Team`,
  };
  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Reset Password",
    text: `Please click follow this link to reset your password.
    ${user.generateResetPasswordUrl()}`
  };
  transport.sendMail(email);
}

export function sendRejectEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Registration Request",
    text:
    `Dear ${user.firstName},

    Unfortunately your registration with DCI Alumni Book has been rejected.
    
    For more information please contact ​graduates@digitalcareerinstitute.org​.
    
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}

export function sendDeleteUserEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "DCi Students Portal | Account Status Notification",
    text:
    `Dear ${user.firstName},

    Your profile at DCI Alumni Book has been deleted.
    
    For more information please contact ​graduates@digitalcareerinstitute.org​.
    
    Best regards,
    DCI-Team`
  };
  transport.sendMail(email);
}
