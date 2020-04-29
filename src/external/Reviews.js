import React, { useEffect, useState } from "react";
import firebase from "./fire";
import Grid from "@material-ui/core/Grid";
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
        let data = [];
        setreviews({ status: false, data: false });
        result.forEach((doc) => {
          console.log(doc, "=>", doc.data());
          //data.push(doc.data());
          //console.log(data);
          let obj = doc.data();
          for (var key in obj) {
            console.log(key, obj[key]);
            data.push({ title: key, value: obj[key] });
          }
          // setreviews({
          //   status: false,
          //   data: [doc.data()],
          // });
        });
        console.log(data);

        // data.forEach((obj) => {
        //   for (var key in obj) {
        //     console.log(key, obj[key]);
        //   }
        //   console.log(obj);
        // });
        setreviews({
          status: false,
          data: data,
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  };
  return (
    <div>
      {reviews.data ? (
        reviews.data.map((doc, index) => (
          // console.log(doc.id, "=>", doc.data().value)

          <p style={{ color: "white" }} key={index}>
            {doc.title}:{doc.value}
          </p>
        ))
      ) : (
        <span></span>
      )}
    </div>
  );
};
export default Reviews;
