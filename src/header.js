import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "./logo.png";
import IconButton from "@material-ui/core/IconButton";
import { Link, Redirect } from "react-router-dom";
import { InputBase, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  const [search, setsearch] = useState("");
  const [query, setquery] = useState("");
  let searchbutton = React.createRef();
  useEffect(() => {
    console.log(query);
    searchbutton.current.click();
  }, [query]);
  const searchmovie = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=284724fa14b3273f6e85db9b124677a0&language=en-US&query=${search}&page=1&include_adult=false`
      ).then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            setquery(res.data.results[0].id);
          })
      );
    }
  };

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} alt="Logo" />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link
              to="/Home"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Movie Review
            </Link>
          </Typography>

          <div style={{ display: "flex" }}>
            <Link
              to="/Reviews"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={(e) => {
                  return <Redirect to="/Reviews"></Redirect>;
                }}
              >
                Your Reviews
              </Button>
            </Link>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Link
                  to={`/Home/${query}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <IconButton ref={searchbutton} aria-label="search">
                    <SearchIcon style={{ color: "white" }} />
                  </IconButton>
                </Link>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                onKeyPress={(ev) => {
                  searchmovie(ev, setsearch);
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
