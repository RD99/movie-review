import React from "react";

import { Card, Chip, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const Movie = ({ info }) => {
  if (info.poster_path) {
    return (
      <div className="moviecard" style={{ width: 250 }}>
        {info.poster_path ? (
          <Card>
            <Link
              to={`/Home/${info.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <p>{info.title}</p>

              <div className="movieinfo">
                <img
                  width={250}
                  height={375}
                  float="left"
                  src={"https://image.tmdb.org/t/p/w500" + info.poster_path}
                  alt={info.title}
                ></img>
              </div>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography style={{ marginTop: 5 }}>Popularity : </Typography>
                <Chip label={info.popularity} color="secondary" />
              </div>
            </Link>
          </Card>
        ) : (
          <span></span>
        )}
      </div>
    );
  } else {
    return null;
  }
  // return (
  //   <div className="moviecard" style={{ width: 250 }}>
  //     {info.poster_path ? (
  //       <Card>
  //         <Link
  //           to={`/Home/${info.title}`}
  //           style={{
  //             textDecoration: "none",
  //             color: "inherit",
  //             cursor: "pointer"
  //           }}
  //         >
  //           <p>{info.title}</p>

  //           <div className="movieinfo">
  //             <img
  //               width={250}
  //               height={375}
  //               float="left"
  //               src={"https://image.tmdb.org/t/p/w500" + info.poster_path}
  //               alt={info.title}
  //             ></img>
  //           </div>
  //           <div style={{ display: "flex", justifyContent: "space-evenly" }}>
  //             <Typography style={{ marginTop: 5 }}>Popularity : </Typography>
  //             <Chip label={info.popularity} color="secondary" />
  //           </div>
  //         </Link>
  //       </Card>
  //     ) : (
  //       <span></span>
  //     )}
  //   </div>
  // );
};
export default Movie;
