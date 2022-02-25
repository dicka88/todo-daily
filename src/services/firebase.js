import { getAuth, signOut } from "firebase/auth";

export async function logout() {
  await signOut(getAuth());
}