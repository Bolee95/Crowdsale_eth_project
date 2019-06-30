import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import bigInt from "big-integer";
import ElfakContract from "../ethereum/elfaktoken";
import ElfakService from "../services/ElfakContract";

class ElfakTransactionsComponent extends Component {
  state = {
    decimals: "0",
    transactions: []
  };

  async componentDidMount() {
    const elfakContract = ElfakContract();
    let decimals = await ElfakService.getDecimals();
    this.setState({decimals: decimals});
    let component = this;

    elfakContract.events.Transfer(
      {
        filter: {},
        fromBlock: 0
      },
      function(error, event) {
        let decimalValue = bigInt(event.returnValues[2]._hex) / Math.pow(10, component.state.decimals);
        let transaction = {
          addressFrom: event.returnValues[0],
          addressTo: event.returnValues[1],
          value: decimalValue
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
      containerId: "lista"
    });
  }

  render() {
    const listTransactions = this.state.transactions.map(x => (
      <tr key={this.state.transactions.indexOf(x) + 1}>        
        <td className="col-xs-4">{x.addressFrom}</td>
        <td className="col-xs-4">{x.addressTo}</td>
        <td className="col-xs-4">{x.value}</td>
      </tr>
    ));

    return (
      <React.Fragment>
        <h1>ELFAK transactions</h1>
        <table className="table table-fixed">
          <thead className="thead-dark">
            <tr>
              <th scope="col-xs-4">Address from</th>
              <th scope="col-xs-4">Address to</th>
              <th scope="col-xs-4">Tokens</th>
            </tr>
          </thead>
          <tbody id="lista">{listTransactions}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ElfakTransactionsComponent;
