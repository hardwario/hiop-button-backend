import * as sendgrid from "@sendgrid/mail";
import { sendgridKey } from "../firebase/firebase";

sendgrid.setApiKey(sendgridKey);

export const sendMail = (
  recipient: string,
  recipientName: string,
  message: string
) => {
  const msg = {
    from: `support@hardwario.com`,
    to: recipient,
    subject: "HARDWARIO - Auth Token",
    html: `Hello ${recipientName}!
        <br />
        ${message}
        <br />
        Best, HARDWARIO
        `
  };
  return sendgrid.send(msg);
};

module.exports = {
  sendMail
};