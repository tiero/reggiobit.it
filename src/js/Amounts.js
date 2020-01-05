import React, { Component } from "react";

class Amounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bitcoin: "",
      euro: ""
    }
  }

  onValueChange(value, currency, priceWithFee) {

    if (isNaN(priceWithFee))
      return;

    if (isNaN(value))
      return;

    if (currency !== 'EUR' && currency !== 'BTC')
      return;

    let values = {};

    if (currency === 'EUR')
      values = { euro: value, bitcoin: Number((value / priceWithFee).toFixed(8)) };
    else 
      values = { bitcoin: value, euro: Number((value * priceWithFee).toFixed(2)) };

    this.props.onChange(values);
    this.setState(values);
  }

  render() {
    const { euro, bitcoin } = this.state;
    const priceWithFee = Number(this.props.priceWithFee)
    return (
      <div>
        <EuroInput
          onChange={e => this.onValueChange(e.target.value, 'EUR', priceWithFee)}
          value={euro}
        />
        <BitcoinInput
          onChange={e => this.onValueChange(e.target.value, 'BTC', priceWithFee)}
          value={bitcoin}
        />
      </div>
    )

  }
}

class EuroInput extends Component {
  render() {
    const {value} = this.props;
    return (
      <div className="field">
        <label className="label is-medium">Euro da scambiare </label>
        <div className="control is-large">
          <input 
            className={`input is-large`} 
            type="number" placeholder="💶 100" 
            onChange={this.props.onChange} 
            value={value}
          />
        </div>
      </div>
    );
  }
}

class BitcoinInput extends Component {
  render() {
    const {value} = this.props;
    return (
      <div className="field">
        <label className="label is-medium">Bitcoin da scambiare</label>
        <div className="control is-large">
          <input 
            className={`input is-large`} 
            type="number" placeholder="🧙‍♂️ 0.01" 
            onChange={this.props.onChange} 
            value={value}
          />
        </div>
      </div>
    );
  }
}


export default Amounts;