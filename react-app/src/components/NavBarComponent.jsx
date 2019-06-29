import React, { Component } from "react";

class NavBarComponent extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-default navbar-dark bg-dark ">
        <a className="navbar-brand" href="/">
          Crowdsale Project
        </a>
      </nav>
    );
  }
}

export default NavBarComponent;
