import { doc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

const setUser = async (uid, data) => {
  const ref = doc(db, 'users', where('uid', '==', uid));
  return await updateDoc(ref, data);
};

export default {
  setUser
};