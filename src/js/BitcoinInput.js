import React, { Component } from "react";

class BitcoinInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Bitcoin da scambiare</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="🧙‍♂️ 0.01" onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}

export default BitcoinInput;
