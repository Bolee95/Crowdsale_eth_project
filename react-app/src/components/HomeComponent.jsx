import React, { Component } from "react";
import web3 from "./../services/web3";
import CrowdsaleContract from "../ethereum/crowdsaletoken";
import { animateScroll } from "react-scroll";
import ElfToken from "../ethereum/elfaktoken";
import bigInt from "big-integer";


class HomeComponent extends Component {
  state = {
    transactions: []
  };

  async componentDidMount() {
    const crowdsale = CrowdsaleContract();
    //const token123 = ElfToken();
    let component = this;

    crowdsale.events.TokensPurchased({
      filter: {},
      fromBlock: 0
      }, function(error,event) {

       let transaction = {
          address: event.returnValues[1],
          wei: bigInt(event.returnValues[2]._hex).toString(),
          tokensBought: bigInt(event.returnValues[3]._hex).toString()
        };
        component.addTransaction(transaction);
        component.scrollToBottom();
      });

    this.scrollToBottom();
  }

  addTransaction(transaction) {
    let transactions = this.state.transactions;
    transactions[transactions.length] = transaction;
    return this.setState({ transactions });
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "lista"
    });
  }

  render() {
    const listTransactions = this.state.transactions.map(x => (
      <tr key={this.state.transactions.indexOf(x) + 1}>
        <th className="col-xs-1" scope="row">
          {this.state.transactions.indexOf(x) + 1}
        </th>
        <td className="col-xs-5">{x.address}</td>
        <td className="col-xs-3">{x.wei}</td>
        <td className="col-xs-3">{x.tokensBought}</td>
      </tr>
    ));

    return (
      <div className="container">
        <h1>Tranasactions</h1>
        <table className="table table-fixed">
          <thead className="thead-dark">
            <tr>
              <th scope="col-xs-1">Id</th>
              <th scope="col-xs-5">Adress</th>
              <th scope="col-xs-3">Wei amount</th>
              <th scope="col-xs-3">Token bought</th>
            </tr>
          </thead>
          <tbody id="lista">{listTransactions}</tbody>
        </table>
      </div>
    );
  }
}

export default HomeComponent;
