import * as firebaseFn from "firebase-functions";
import * as adminFn from "firebase-admin";

export const functions = firebaseFn;
export let admin = adminFn.initializeApp();
export const fs = admin.firestore();

export const getFirebaseTimestamp = () => {
  return adminFn.firestore.Timestamp.now();
};

export const twilioAuth: {
  phone: string;
  account: string;
  token: string;
} = firebaseFn.config().twilio;
export const sendgridKey = firebaseFn.config().sendgrid.key;
export const cloudAuth: { token: string } = firebaseFn.config().cloud;

exports.module = {
  functions,
  fs,
  admin,
  twilioAuth,
  cloudAuth,
  getFirebaseTimestamp
};
