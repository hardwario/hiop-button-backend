import { HttpsResponse, Request } from "../utils/interfaces";
import * as corsN from "cors";
import { getDeviceDataById } from "../firebase/firestore";
import { ButtonData, Button } from "../models/button";
const cors = corsN({ origin: true });

export const configFn = async (req: Request, res: HttpsResponse) => {
  return cors(req, res, async () => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Cache-Control", "no-cache");
    console.log(req);
    console.log(req.body);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    try {
      if (req.method === "GET") {
        const data = await getConfig(req.query.id);
        if (data!.error) {
          return res.status(404).send();
        }
        delete data!.created;
        delete data!.activations;
        delete data!.lastActivated;
        return res.status(200).send(JSON.stringify(data));
      } else if (req.method === "POST") {
        const data = req.body as ButtonData;
        if (!(data.id && data.phone && data.text)) {
          return res.status(400).send("Missing device data");
        }
        const deviceData = getConfig(data.id);
        if (!deviceData) {
          return res.status(404).send();
        }
        await update(data);
        return res.status(201).send(`{}`);
      } else {
        return res.status(405).send();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  });
};

const update = (data: ButtonData) => {
  const button = new Button(data);
  return button.update();
};

const getConfig = async (deviceId: string) => {
  const deviceData = await getDeviceDataById(deviceId);
  if (!deviceData.exists) {
    return {
      error: `No device for device ID`
    };
  } else {
    return deviceData.data();
  }
};

module.exports = {
  configFn
};
