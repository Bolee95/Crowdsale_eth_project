import React, { Component } from "react";
import web3 from "./../services/web3";
import CrowdsaleContract from "../ethereum/crowdsaletoken";
import ElfakContract from "../services/ElfakContract";
import { animateScroll } from "react-scroll";
import { MDBDataTable } from 'mdbreact';

class HomeComponent extends Component {
  state = {
    totalSupply: "0",
    transactions: [
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      },
      {
        address: "0x0F0b284557c73467D437835Fb5F36CFDEE7399b3",
        quantity: "4.567",
        time: "15:17 29.6.2019"
      }
    ]
  };

  async componentDidMount() {
    //const elfakContract1 = await ElfakContract.totalSupply();
    //const elfakContract2 = await ElfakContract.balanceOf(this.state.totalSupply);
    //const crowdsale = CrowdsaleContract();
    /*
    this.setState({
      totalSupply: "123",
      transactions: []
    });
   */
    this.scrollToBottom();
  }

  addTransaction(transaction) {}

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "lista"
    });
  }

  render() {
    const listTransactions = this.state.transactions.map(x =>          
      <tr key = {this.state.transactions.indexOf(x) + 1}>
        <th className="col-xs-1" scope="row">{this.state.transactions.indexOf(x) + 1}</th>
        <td className="col-xs-5">{x.address}</td>
        <td className="col-xs-3">{x.quantity}</td>
        <td className="col-xs-3">{x.time}</td>
      </tr>
    );

    return (
      <div className="container">
        <h1>Tranasactions</h1>
          <table className="table table-fixed">
            <thead className="thead-dark">
              <tr>
                <th scope="col-xs-1">Id</th>
                <th scope="col-xs-5">Adress</th>
                <th scope="col-xs-3">Quantity</th>
                <th scope="col-xs-3">Time</th>
              </tr>
            </thead>
            <tbody id="lista">
             {listTransactions}
            </tbody>
          </table>
        </div>
    );
  }
}

export default HomeComponent;
