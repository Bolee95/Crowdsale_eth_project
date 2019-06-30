import React, { Component } from "react";

class MenuComponent extends Component {
  state = {};

  render() {
    return (
      <nav className="nav flex-column whiteColorClass">
        <div className="sidebar-header">
      
        </div>
        <a className="nav-link"  href="/">
        Crowdsale transactions
        </a>
        <a className="nav-link" href="/elfak">
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
