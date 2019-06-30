import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import bigInt from "big-integer";
import CrowdsaleContract from "../ethereum/crowdsaletoken";
import ElfakService from "../services/ElfakContract";

class HomeComponent extends Component {
  state = {
    decimals: "0",
    transactions: []
  };

  async componentDidMount() {
    const crowdsale = CrowdsaleContract();
    let decimals = await ElfakService.getDecimals();
    this.setState({decimals: decimals});
    let component = this;

    crowdsale.events.TokensPurchased(
      {
        filter: {},
        fromBlock: 0
      },
      function(error, event) {
        let decimalValue =  bigInt(event.returnValues[3]._hex) / Math.pow(10, component.state.decimals);
        let transaction = {
          address: event.returnValues[1],
          wei: bigInt(event.returnValues[2]._hex).toString(),
          tokensBought: decimalValue
        };
        component.addTransaction(transaction);
        component.scrollToBottom();
      }
    );

    this.scrollToBottom();
  }

  addTransaction(transaction) {
    let transactions = this.state.transactions;
    transactions[transactions.length] = transaction;
    return this.setState({ transactions });
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "root"
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
      <React.Fragment>
        <h1>Crowdsale transactions</h1>
        <table className="table table-fixed">
          <thead className="thead-dark">
            <tr>
              <th scope="col-xs-1">Id</th>
              <th scope="col-xs-5">Address</th>
              <th scope="col-xs-3">Wei amount</th>
              <th scope="col-xs-3">Token bought</th>
            </tr>
          </thead>
          <tbody id="lista">{listTransactions}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default HomeComponent;
