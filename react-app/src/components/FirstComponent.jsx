import React, { Component } from 'react';
import { throwStatement } from '@babel/types';

class FirstComponent extends Component {
   state = {
       count: 0,
       tags: ['tag1', 'tag2', 'tag3'] 
   };
   
   render(){
       return (
       <React.Fragment>
          <h1>Hello World</h1>        
          <span className = { this.RenderClass() }>{this.fornatCount()}</span>
          <button className = "btn btn-secondary btn-sm" onClick = { this.handleIncrement }>Increment</button>
          <ul>
           { this.state.tags.map(tag => <li key = {tag}>{ tag }</li>) }
          </ul>
        </React.Fragment>
       )};
    
    handleIncrement = () => {
      this.setState({ count: this.state.count +1 });
    }

    doHandleIncrement = () => {
        this.handleIncrement()
    }

    RenderClass() {
        let clases = "badge m-2 badge-";
        clases += this.state.count === 0 ? "warning" : "primary";
        return clases;
    }

    fornatCount(){
        const { count } = this.state;
        return count === 0 ? "Zero" : count;
    }
}

export default FirstComponent;