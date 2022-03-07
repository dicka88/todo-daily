import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

const userRef = collection(db, 'users');

export const getUser = async (uid) => {
  try {
    const q = query(userRef, where('uid', '==', uid))
    const snapshot = await getDocs(q)
    
    let user = {}
    snapshot.forEach((item) => {
      user = item.data()
    })

    return user
  } catch (err) {
    console.error(err)
  }
}

const setUser = async (uid, data) => {
  try {
    const q = query(userRef, where('uid', '==', uid))
    const snapshot = await getDocs(q)

    snapshot.forEach((item) => {
      updateDoc(item.ref, data)
    })
  } catch (err) {
    console.error(err)
  }
};

export default {
  setUser
};