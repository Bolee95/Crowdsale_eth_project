import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import MenuComponent from "./components/MenuComponent";
import HomeComponent from "./components/HomeComponent";
import TransferComponent from "./components/TransferComponent";
import SendComponent from "./components/SendComponent";
import ProfileComponent from "./components/ProfileComponent";
import ByeComponent from "./components/ByeComponent";
import ApproveTransferComponent from "./components/ApproveTransferComponent";
import ELFAKTransactionsComponent from "./components/ELFAKTransactionsComponent";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBarComponent />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 bg-secondary menu-component">
            <MenuComponent />
          </div>
          <div className="col-md-6 bg-light">
            <Router>
              <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/elfak" exact component={ELFAKTransactionsComponent} />
                <Route path="/send" component={SendComponent} />
                <Route path="/transfer" component={TransferComponent} />
                <Route path = "/approve" component={ApproveTransferComponent} />
                <Route path = "/byetokens" component={ByeComponent} />
              </Switch>
            </Router>
          </div>
          <div className="col-md-4">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
