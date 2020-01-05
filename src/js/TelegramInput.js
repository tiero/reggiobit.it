import React, { Component } from "react";

class TelegramInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Username Telegram</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="text" placeholder="✈️ @MioUsername" onChange={this.props.onChange}/>
        </div>
      </div>
    );
  }
}

export default TelegramInput;
