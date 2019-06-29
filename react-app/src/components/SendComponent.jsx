import React, { Component } from "react";

class SendComponent extends Component {
  render() {
    return (
      <React.Fragment>
      <h1 className = "form-text m-2">Send tokens</h1>
      <form className = "col-md-12" onSubmit={this.handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </React.Fragment>
    );
  }

  handleSubmit(){

  }
}

export default SendComponent;
