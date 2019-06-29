import React, { Component } from "react";

class MenuComponent extends Component {
  state = {};

  render() {
    return (
      <nav className="nav flex-column">
        <div className="sidebar-header">
          <h3 className="bold">Menu</h3>
        </div>
        <a className="nav-link active" href="/">
          Home
        </a>
        <a className="nav-link" href="/send">
          Send tokens
        </a>
        <a className="nav-link" href="/transfer">
          Transfer
        </a>
      </nav>
    );
  }
}

export default MenuComponent;
