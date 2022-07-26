import React from "react";
import {Switch, Route} from "react-router-dom"
import Header from ".//Header";
import NotFound from ".//NotFound";
import Home from "./Common/Home"
import Study from "./Common/Study"


function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
