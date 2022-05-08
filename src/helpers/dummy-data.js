import { collection, addDoc } from "firebase/firestore";

import { firestoreDB } from "../lib/firebase";

export function seedDatabase() {
  const users = [
    {
      userId: "iBZM09mON2gCAk304OBbRRkB6BA3",
      name: "karl",
      fullName: "Karl Hadwen",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      name: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["iBZM09mON2gCAk304OBbRRkB6BA3"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      name: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["iBZM09mON2gCAk304OBbRRkB6BA3"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      name: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["iBZM09mON2gCAk304OBbRRkB6BA3"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    addDoc(collection(firestoreDB, "users"), users[k])
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  for (let i = 1; i <= 5; ++i) {
    addDoc(collection(firestoreDB, "photos"), {
      photoId: i,
      userId: "2",
      imageSrc: `../images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "dali",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    })
      .then((res) => console.log("image Added", res))
      .catch((err) => console.log(err));
  }
}
