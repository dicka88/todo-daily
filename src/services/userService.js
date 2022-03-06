import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

const userRef = collection(db, 'users');

const setUser = async (uid, data) => {
  try {
    const q = query(userRef, where('uid', '==', uid))
    const dc = await getDocs(q)

    dc.forEach((item) => {
      updateDoc(item.ref, data)
    })
  } catch (err) {
    console.error(err)
  }
};

export default {
  setUser
};