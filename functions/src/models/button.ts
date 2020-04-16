import { getFirebaseTimestamp, fs } from "../firebase/firebase";
import { sendSMS } from "../services/twilio";

export class Button extends Object {
  id: string;
  phone?: string[];
  text?: string[];
  activations?: number;
  lastActivated?: FirebaseFirestore.Timestamp;

  constructor(data: ButtonData) {
    super();
    this.id = data.id;
    this.phone = data.phone;
    this.text = data.text;
    this.activations = data.activations;
    this.lastActivated = data.lastActivated;
  }

  notify = async (buttonNumber: number) => {
    if (!this.phone) {
      return;
    }
    const promises = this.phone.map((number) => {
      if (this.text![buttonNumber] && number) {
        return sendSMS(number, this.text![buttonNumber]);
      } else {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }
    });
    promises.push(this.activated());
    await Promise.all(promises);
  };

  update = async () => {
    const data = this.getData();
    await fs.doc(`devices/${data.id}`).update(data);
  };

  static add = async (id: string) => {
    await fs.doc(`devices/${id}`).set({ id: id }, { merge: true });
  };

  activated = async () => {
    const data = this.getData();
    try {
      await fs.runTransaction(async (t) => {
        const deviceRef = fs.doc(`devices/${data.id}`);
        if (!data.activations) {
          data.activations = 0;
        }
        data.activations += data.phone!.length;
        data.lastActivated = getFirebaseTimestamp();
        return t.update(deviceRef, data);
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  /**
   * Return new Button from ButtonData
   *
   * @memberof Button
   * @returns {ButtonData}
   */
  fromData = (data: ButtonData) => {
    return new Button(data);
  };

  /**
   * Get ButtonData from Button
   *
   * @memberof Button
   * @returns {ButtonData}
   */
  getData = () => {
    return JSON.parse(JSON.stringify(this)) as ButtonData;
  };
}

export interface ButtonData {
  id: string;
  phone?: string[];
  text?: string[];
  created?: FirebaseFirestore.Timestamp;
  activations?: number;
  lastActivated?: FirebaseFirestore.Timestamp;
}
