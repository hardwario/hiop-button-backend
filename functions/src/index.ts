import { functions } from "./firebase/firebase";

export const config = functions.https.onRequest(async (req, res) => {
  const { configFn } = await require("./fn/config");
  return configFn(req, res);
});

export const notify = functions.https.onRequest(async (req, res) => {
  const { notifyFn } = await require("./fn/notify");
  return notifyFn(req, res);
});

export const addCreatedTimestamp = functions.firestore
  .document(`devices/{deviceId}`)
  .onCreate(async snapshot => {
    const { addCreatedTimestampFn } = await require("./fn/addCreatedTimestamp");
    return addCreatedTimestampFn(snapshot);
  });

