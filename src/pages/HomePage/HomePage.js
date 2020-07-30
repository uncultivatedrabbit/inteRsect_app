import React, { Component } from "react";
import Context from '../../Context'

export default class HomePage extends Component {
  static contextType = Context;

  componentDidMount(){}
  
  render() {
    console.log(this.context)
    return (
      <div className="Home__Page">
        <h1>Logged In</h1>
      </div>
    );
  }
}
