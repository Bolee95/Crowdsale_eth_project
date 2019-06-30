import React, { Component } from "react";


class ByeComponent extends Component{

    handleBye(){

    }

    render(){
        return (
            <React.Fragment>
            <h1 className = "form-text m-2">Bye tokens</h1>
            <div className = "col-md-12">
            <div className="form-group">
                <label htmlFor="InputAdressWhoSend">Adress who send</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputAdressWhoSend"
                  aria-describedby="emailHelp"
                  placeholder="Enter adress"
                />
                <small id="InputAdressWhoSendHelp" className="form-text text-muted">
                 The address from where it is sent.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="InputAdress">Adress where send</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputAdress"
                  aria-describedby="emailHelp"
                  placeholder="Enter adress"
                />
                <small id="AdressHelp" className="form-text text-muted">
                  Adress where send tokens.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="InputQuantity">Quantity tokens</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputQuantity"
                  placeholder="Enter quantity"
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleBye}>
                Submit
              </button>
            </div>
            </React.Fragment>
          );
    }
}

export default ByeComponent;