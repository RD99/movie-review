import React, { useEffect } from "react";
import "./App.css";
import Header from "./header";
import Home from "./home";
import Reviews from "./external/Reviews";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Movieinfo from "./external/Movieinfo";
function App() {
  return (
    <Router>
      <Switch>
        <React.Fragment>
          <Header />
          {/* {logged.checklogged ? (
            <Redirect to="/Home" />
          ) : (
            <Redirect to="/Login" />
          )} */}
          {<Redirect to="/Home" />}
          <Route path="/Home" exact component={Home} />
          <Route path="/Reviews" component={Reviews} />
          {/* <Route path="/info" component={Movieinfo} /> */}
          <Route path="/Home/:id" component={Movieinfo} />
        </React.Fragment>
      </Switch>
    </Router>
  );
}
export default App;
