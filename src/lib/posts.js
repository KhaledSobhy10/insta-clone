import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { firestoreDB } from "./firebase";
import { getUserById } from "./user";

export async function getPostsOfFollowing(following) {
  const photosRef = collection(firestoreDB, "photos");
  const photoQuery = query(photosRef, where("userId", "in", following));
  const querySnapshot = await getDocs(photoQuery);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ docId: doc.id, ...doc.data() });
  });

  return await Promise.all(
    posts.map(async (post) => {
      const publisherUser = await getUserById(post.userId);
      return {
        ...post,
        name: publisherUser.data().name,
        fullName: publisherUser.data().fullName,
      };
    })
  );
}

export function updateLikeOfPost(docId, userId, like) {
  const postRef = doc(firestoreDB, "photos", docId);
  updateDoc(postRef, {
    likes: like ? arrayUnion(userId) : arrayRemove(userId),
  })
    .then(() => {
      // console.log("Herer ");
    })
    .catch((err) => {
      console.log("err ", err);
    });
}

export function addPost(postObject) {}

export function removePost(docId) {}

export function addCommentToPost(docId, displayNameOfUser, comment) {
  const postRef = doc(firestoreDB, "photos", docId);
  updateDoc(postRef, {
    comments: arrayUnion({ displayName: displayNameOfUser, comment }),
  });
}

export async function getPostsOfUser(userId) {
  const photosRef = collection(firestoreDB, "photos");
  const photosQuery = query(photosRef, where("userId", "==", userId));
  const docs = await getDocs(photosQuery);
  const posts = [];
  docs.forEach((doc) => {
    const { imageSrc, comments, likes, caption } = doc.data();
    posts.push({
      docId: doc.id,
      totalComments: comments.length,
      totalLikes: likes.length,
      imgSrc: imageSrc,
      caption,
    });
  });
  return posts;
}
