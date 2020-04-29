import React, { useEffect, useState } from "react";
import Movie from "./external/moviecard";
import { ScaleLoader } from "react-spinners";
import { createMuiTheme } from "@material-ui/core";
const greytheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});
function Home(props) {
  const [movies, setmovies] = useState([]);
  const [loader, setloader] = useState(true);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const m = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=284724fa14b3273f6e85db9b124677a0"
    );
    // const m = await fetch(
    //   "https://api.themoviedb.org/3/discover/movie?api_key=284724fa14b3273f6e85db9b124677a0&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"
    // );

    // const m = await fetch(
    //   "https://api.themoviedb.org/3/movie/550?api_key=284724fa14b3273f6e85db9b124677a0"
    // );
    // const m = await fetch(
    //   "http://www.omdbapi.com/?i=tt3896198&apikey=d5603ae7"
    // );
    // const m = await fetch(
    //   "http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1&apikey=d5603ae7"
    // );
    const movie = await m.json();
    console.log(movie);

    const movies = await movie.results;
    console.log(movies.length);

    setloader(false);
    //console.log(movies);
    // console.log(typeof movies.results);

    //await setmovies([movies]);

    //console.log(movies);
    // movies.forEach(element => {
    //   setmovies([...moviess, element]);
    //   console.log(moviess);
    // });
    setmovies(movies);
    console.log(movies);
  };

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
        <div>
          <h1>This weeks trending movies</h1>

          <div className="movies">
            {movies.map((mov, index) => (
              <Movie key={index} info={mov} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
