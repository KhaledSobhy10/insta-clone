import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  limit,
  arrayRemove,
  where,
} from "firebase/firestore";

import { firestoreDB } from "./firebase";

export function getUserById(id) {
  const docRef = doc(firestoreDB, "users", id);
  return getDoc(docRef);
}

export async function getSuggestionsProfiles(userId) {
  // get users profiles that doesn't followed  by that userId

  const q = query(collection(firestoreDB, "users"), limit(15));

  const querySnapshot = await getDocs(q);

  console.log("current id ", userId);
  const profilesToFollow = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    if (user.id !== userId && !user.followers.includes(userId))
      profilesToFollow.push({
        id: user.id,
        name: user.name,
        fullName: user.fullName,
      });
  });
  return profilesToFollow;
}

export function follow(userId, userIdToFollow) {
  return Promise.all([
    addFollower(userId, userIdToFollow),
    addFollowing(userId, userIdToFollow),
  ]);
}

function addFollower(userId, userIdToFollow) {
  // will add your id in his followers list
  const userToFollow = doc(firestoreDB, "users", userIdToFollow);

  // Atomically add a new id to the "follower" array field.
  return updateDoc(userToFollow, {
    followers: arrayUnion(userId),
  });
}

function addFollowing(userId, userIdToFollow) {
  // will add his id to your following list

  const userFollower = doc(firestoreDB, "users", userId);

  // Atomically add a new id to the "following" array field.
  return updateDoc(userFollower, {
    following: arrayUnion(userIdToFollow),
  });
}

export function unFollow(userId, userIdUnFollow) {
  return Promise.all([
    removeFollower(userId, userIdUnFollow),
    removeFollowing(userId, userIdUnFollow),
  ]);
}

function removeFollower(userId, userIdToUnFollow) {
  // will remove your id from his followers list
  const userToFollow = doc(firestoreDB, "users", userIdToUnFollow);

  // Atomically remove a id from the "follower" array field.
  return updateDoc(userToFollow, {
    followers: arrayRemove(userId),
  });
}

function removeFollowing(userId, userIdToUnFollow) {
  // will remove his id from your following list

  const userFollower = doc(firestoreDB, "users", userId);

  // Atomically remove a  id from the "following" array field.
  return updateDoc(userFollower, {
    following: arrayRemove(userIdToUnFollow),
  });
}

export async function getProfileInfoByName(displayName) {
  const usersRef = collection(firestoreDB, "users");
  const profileQuery = query(usersRef, where("name", "==", displayName));
  const docs = await getDocs(profileQuery);
  let profile = {};
  docs.forEach((doc) => {
    const { fullName, following, followers, id } = doc.data();
    profile = {
      fullName,
      followers,
      following,
      id,
    };
  });
  return profile;
}

// test functions
export async function testRemoveAllFollowing(currentUserId) {
  // get following list
  const user = await getUserById(currentUserId);
  // console.log("Test remove all , user = ", user.data());
  const following = user.data().following;
  // console.log("test all remove , following ", following);
  // remove currentUserId from all another users followers list
  following.forEach((id) => {
    removeFollower(currentUserId, id);
  });
  // remove user following list
  const userFollower = doc(firestoreDB, "users", currentUserId);
  // Atomically remove a  id from the "following" array field.
  updateDoc(userFollower, {
    following: [],
  });
}
//
