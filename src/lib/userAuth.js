import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { firestoreDB } from "./firebase";

export function signInWithEmailAndPasswordOnly(email, password) {
  return signInWithEmailAndPassword(getAuth(), email, password);
}

//
export async function isUserNameAlreadyExist(name) {
  const qName = query(
    collection(firestoreDB, "users"),
    where("name", "==", name)
  );
  const querySnapshotName = await getDocs(qName);
  return querySnapshotName.size >= 1;
}
//
export async function isUserFullNameAlreadyExist(fullName) {
  const qName = query(
    collection(firestoreDB, "users"),
    where("fullName", "==", fullName)
  );
  const querySnapshotName = await getDocs(qName);
  return querySnapshotName.size >= 1;
}
//
export async function isEmailAlreadyExist(email) {
  const qEmail = query(
    collection(firestoreDB, "users"),
    where("email", "==", email)
  );
  const querySnapshotEmail = await getDocs(qEmail);
  return querySnapshotEmail.size;
}

export function signupUserWithEmailAndPassword(userEmail, userPassword) {
  return createUserWithEmailAndPassword(getAuth(), userEmail, userPassword);
}

export function addUserProfile(user) {
  user.creationDate = Date.now();
  delete user.password;
  return setDoc(doc(firestoreDB, "users", user.id), user);
}

export function signOutUser() {
  return signOut(getAuth());
}

export function addUserDisplayName(name) {
  return updateProfile(getAuth().currentUser, {
    displayName: name,
  });
}
