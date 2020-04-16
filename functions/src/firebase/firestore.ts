import { fs } from "./firebase";

export const getDeviceDataById = async (deviceId: string) => {
  const deviceDoc = await fs.doc(`devices/${deviceId}`).get();
  return deviceDoc;
};

module.exports = {
  getDeviceDataById
};
