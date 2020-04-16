import { twilioAuth } from "../firebase/firebase";
import * as twilio from "twilio";
const twilioClient = twilio(twilioAuth.account, twilioAuth.token);

export const sendSMS = async (to: string, message: string) => {
  console.log(`Sending ${message} to ${to}`);
  const result = await twilioClient.messages.create({
    body: message,
    from: twilioAuth.phone,
    to: to,
  });
  console.log(result);
};

exports.module = {
  sendSMS,
};
