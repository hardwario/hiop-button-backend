import { HttpsResponse, Request } from "../utils/interfaces";
import * as corsN from "cors";
import { Button, ButtonData } from "../models/button";
import { getDeviceDataById } from "../firebase/firestore";
import { cloudAuth } from "../firebase/firebase";
import { getButtonNumber } from "../utils/utils";
const cors = corsN({ origin: true });

export const notifyFn = async (req: Request, res: HttpsResponse) => {
  return cors(req, res, async () => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Cache-Control", "no-cache");
    console.log(req);
    console.log(req);
    console.log(req.body);
    console.log(req.method);
    console.log(req.url);
    try {
      if (req.method === "POST") {
        if (req.header("X-Api-Key") !== cloudAuth.token) {
          return res.status(403).send("Missing token");
        }
        const body = req.body;
        if (!req.body.id) {
          return res.status(400).send("Missing request data");
        }
        if (!(body.button0 || body.button1 || body.button2 || body.button3)) {
          await create(req.body.id);
          return res.send(201).send("{}");
        }
        try {
          const number = getButtonNumber(
            body.button0,
            body.button1,
            body.button2,
            body.button3
          );
          await notify(body.id, number);
          return res.send("Notifying... ");
        } catch (error) {
          console.log("Inside notify");
          console.error(error);
          return res.status(400).send("Missing data");
        }
      } else {
        return res.status(500).send();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Notify fn error");
    }
  });
};

const create = (id: string) => {
  return Button.add(id);
};

const notify = async (deviceId: string, buttonNumber: number) => {
  const buttonData = await getDeviceDataById(deviceId);
  const button = new Button(buttonData.data() as ButtonData);
  if (button.text && button.phone!.length > 0) {
    return button.notify(buttonNumber);
  } else {
    throw new Error(`Missing data`);
  }
};

module.exports = {
  notifyFn
};
