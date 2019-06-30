import React, { Component } from "react";
import CrowdsaleContract from "../services/CrowdsaleContract";

class NavBarComponent extends Component {
  state = {
    timeAndDate: ""
  };

  async componentDidMount() {
    let isOpen = await CrowdsaleContract.isCrowdsaleOpen();
    var timeLeft;
    if (isOpen) {
        timeLeft = await CrowdsaleContract.timeLeftToCloseContract();
        timeLeft = "Crowdsale is open. End date: " + timeLeft;
    } else {
      timeLeft = "Crowdsale is currently closed."
    }


    this.setState({
      timeAndDate: timeLeft,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-dark bg-dark ">
        <a className="navbar-brand" href="/">
          Crowdsale Project
        </a>
        <a className="navbar-brand" href=""
        >
          {this.state.timeAndDate}
        </a>
      </nav>
    );
  }
}

export default NavBarComponent;
