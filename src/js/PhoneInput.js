import React, { Component } from "react";

class PhoneInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Telefono</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="tel" placeholder="☎️ Numero di cellulare" onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
}

export default PhoneInput;