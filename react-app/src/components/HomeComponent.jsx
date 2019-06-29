import React, { Component } from "react";
import web3 from "./../services/web3";
import CrowdsaleContract from "../ethereum/crowdsaletoken";
import ElfakContract from "../services/ElfakContract";

class HomeComponent extends Component {
  state = {
    totalSupply: "0x52083F1dd3d62f9E070D5a5477d2770cbB8ea34F",
    transactions: []
  };

  async componentDidMount() {
    //const elfakContract1 = await ElfakContract.totalSupply();
    //const elfakContract2 = await ElfakContract.balanceOf(this.state.totalSupply);
    //const crowdsale = CrowdsaleContract();  
           
    this.setState({
      totalSupply: "123",
      transactions: []
    });
  }

  render() {
    return (
      <div>
        <h1>Home Component</h1>
        <h3>{this.state.totalSupply}</h3>
      </div>
    );
  }
}

export default HomeComponent;
