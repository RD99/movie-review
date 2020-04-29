import firebase from "./fire";

export const submit = (title, rating) => {
  console.log(title, rating);
  const db = firebase.firestore();

  const data = {};
  data[title] = rating;
  db.collection("/ratings")
    .doc(title)
    .set(data)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {});
};

// export default { submit, viewreviews };
// result.forEach((doc) => {
//   console.log(doc.id, "=>", doc.data());
// });