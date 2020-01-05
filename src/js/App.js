import React, { Component } from "react";

// Custom components
import Amounts from './Amounts';
import PhoneInput from './PhoneInput';
import RadioButton from './RadioButton';
import TelegramInput from './TelegramInput';

const typeOptions = ['Compra', 'Vendi'];
const methodOptions = ['Telegram', 'SMS', 'Chiamata'];

const DEALER_FEE = 0.05


class App extends Component {

  constructor() {
    super();
    this.state = {
      type: typeOptions[0],
      method: methodOptions[0],
      price: undefined,
      euro: undefined,
      bitcoin: undefined
    }
  }

  componentDidMount() {

    fetch('https://blockchain.info/ticker')
      .then(res => res.json())
      .then(json => this.setState({ price: json.EUR.last }))

  }

  render() {
    const { method, price, euro, bitcoin } = this.state;
    const priceWithFee = Number((price + (price * DEALER_FEE)).toFixed(2));

    return (
      <div className="box has-text-centered">
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <h1 className="title">{price && `1 BTC = ${priceWithFee} Euro`}</h1>
            <label className="label is-medium">Tipo di scambio</label>
            <RadioButton
              options={typeOptions}
              onChange={type => this.setState({ type })}
            />
            <Amounts priceWithFee={priceWithFee} />
            <label className="label is-medium">Metodo di contatto</label>
            <RadioButton
              options={methodOptions}
              onChange={method => this.setState({ method })}
            />
            {
              method === methodOptions[0] ?
                <TelegramInput onChange={e => console.log(e.target.value)} /> :
                <PhoneInput onChange={e => console.log(e.target.value)} />
            }
          </div>
        </div>
      </div>
    );
  }
}







export default App;