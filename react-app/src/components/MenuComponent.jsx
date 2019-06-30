import React, { Component } from "react";

class MenuComponent extends Component {
  state = {};

  render() {
    return (
      <nav className="nav flex-column">
        <div className="sidebar-header">
          <h3 className="bold" id= "justified">Menu</h3>
        </div>
        <a className="nav-link active" href="/">
        Crowdsale transactions
        </a>
        <a className="nav-link active" href="/elfak">
        ELFAK transactions
        </a>
        <a className="nav-link" href="/send">
          Send tokens
        </a>
        <a className="nav-link" href="/byetokens">
          Buy tokens
        </a>
        <a className="nav-link" href="/approve">
          Approve transfer
        </a>
        <a className="nav-link" href="/transfer">
          Transfer
        </a>  
      </nav>
    );
  }
}

export default MenuComponent;
