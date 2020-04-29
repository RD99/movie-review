import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { submit } from "./submit-review";
import { Card, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const Movieinfo = ({ match }) => {
  const [movie, setmovie] = useState([]);
  const [reviews, setreviews] = useState();
  const [loader, setloader] = useState(true);
  const [btn, setbtn] = useState({ status: false, text: "Submit Review" });
  const [value, setValue] = React.useState(2);
  useEffect(() => {
    const fetchdata = async () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=284724fa14b3273f6e85db9b124677a0&language=en-US`
      ).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            setmovie(res.data);

            fetch(
              `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=284724fa14b3273f6e85db9b124677a0&language=en-US`
            ).then((response) =>
              response
                .json()
                .then((data) => ({
                  data: data,
                  status: response.status,
                }))
                .then((resp) => {
                  //console.log(res.data.results);
                  const reviews = resp.data.results;
                  setreviews(reviews);
                  console.log(reviews);
                  setloader(false);
                })
            );
          })
      );

      //const movie = await movie.results;

      // movie.forEach(element => {
      //   setmovie([...movie, element]);
      // });

      //console.log(movie);
    };
    fetchdata();
  }, [match.params.id]);

  return (
    <div>
      {loader ? (
        <div style={{ height: "100vh" }}>
          <div className="spinner">
            <ScaleLoader
              sizeUnit={"px"}
              size={150}
              color={"#000000"}
              loading={loader}
            />
          </div>
        </div>
      ) : (
        // <div className="movie">
        //   {movie.map((mov, index) => (
        //     <Movie key={index} info={mov} />
        //   ))}
        // </div>
        <div className="moviecard">
          <Card style={{ display: "flex" }}>
            <img
              width={250}
              height={375}
              float="left"
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            ></img>
            <div>
              <h1>{movie.title}</h1>
              <h4>{movie.tagline}</h4>
              <label>Description: {movie.overview}</label>
              <h2>review the movie</h2>
              <div
                style={{
                  width: "100px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingBottom: 10,
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <label>{value}</label>
              </div>
              <Button
                variant="contained"
                color="secondary"
                disabled={btn.status}
                onClick={(e) => {
                  //setbtn({ status: true, text: "Submitting review..." });

                  submit(movie.title, value);
                  // Axios.post("/rating", {
                  //   userid: logged.loggeddata.data["uid"],
                  //   title: movie.title,
                  //   rating: value,
                  // })
                  //   .catch((err) => {
                  //     console.log(err);
                  //     setbtn({
                  //       status: false,
                  //       text: "Submit Review..error occured",
                  //     });
                  //   })
                  //   .then((resp) => {
                  //     console.log(resp);
                  //     setbtn({ status: false, text: "Submit Review" });
                  //   });
                }}
              >
                {btn.text}
              </Button>
            </div>
          </Card>
          <br></br>
          <Card>
            <h2>Reviews</h2>
            <div>
              {reviews.map((mov, index) => (
                <div className="moviereviews" key={index}>
                  <h3 style={{ float: "left" }}>{mov.author}</h3>
                  <br></br>
                  <p
                    onClick={(e) => {
                      e.target.classList.toggle("fillreview");
                    }}
                  >
                    {mov.content}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Movieinfo;
