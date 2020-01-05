import React, { Component } from "react";


class EuroInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Euro da scambiare </label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="💶 100" onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
}

export default EuroInput;