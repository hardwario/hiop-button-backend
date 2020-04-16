import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { getFirebaseTimestamp } from "../firebase/firebase";

export const addCreatedTimestampFn = async (snapshot: DocumentSnapshot) => {
  return snapshot.ref.update({ created: getFirebaseTimestamp() });
};

module.exports = {
  addCreatedTimestampFn
};
