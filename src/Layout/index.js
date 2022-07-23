import React from "react";
import {Switch, Route} from "react-router-dom"
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/">
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
