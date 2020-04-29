import React, { useEffect, useState } from "react";
import firebase from "./fire";
const Reviews = () => {
  const [reviews, setreviews] = useState({
    status: true,
  });
  useEffect(() => {
    if (reviews.status) {
      fetchreviews();
    }
    console.log(reviews);
  }, [reviews]);

  const fetchreviews = () => {
    const db = firebase.firestore();
    db.collection("/ratings")
      .limit(10)
      .get()
      .then((result) => {
        setreviews({ status: false, data: {} });
        result.forEach((doc) => {
          console.log(doc, "=>", doc.data());
          setreviews({
            status: false,
            data: [...reviews.data, doc.data()],
          });
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };
  return (
    <div>
      {/* {reviews.map((doc, index) => (
        // console.log(doc.id, "=>", doc.data().value)
        <p>{doc.data().value}</p>
      ))} */}
    </div>
  );
};
export default Reviews;
