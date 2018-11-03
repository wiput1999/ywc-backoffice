import React, {Component, Fragment} from "react";

import Candidates from "../dashboard/Candidates";
import Dashboard from "../dashboard";
import Menubar from "../common/Menubar";

export default class Manager extends Component {
  getRoute = () => {
    const url = window.location.href.split("/");
    return url[url.length - 1];
  };

  getHeader = () => ({
    admin: "Dashboard",
    candidates: "All Candidates",
  });

  render() {
    return (
      <Fragment>
        <Menubar
          header={this.getHeader()[this.getRoute()]}
          menus={[
            {icon: "user", name: "Dashboard", to: "/manager"},
            {icon: "user", name: "All Candidates", to: "/manager/candidates"},
          ]}>
          {this.getRoute() === "candidates" && <Candidates />}
          {this.getRoute() === "manager" && <Dashboard />}
        </Menubar>
      </Fragment>
    );
  }
}
