import React, { Component } from "react";

// Custom components
import EuroInput from './EuroInput';
import PhoneInput from './PhoneInput';
import RadioButton from './RadioButton';
import BitcoinInput from './BitcoinInput';
import TelegramInput from './TelegramInput';

const typeOptions = ['Compra', 'Vendi'];
const methodOptions = ['Telegram', 'SMS', 'Chiamata'];


class App extends Component {

  constructor() {
    super();
    this.state = {
      type: typeOptions[0],
      method: methodOptions[0],
      price:null
    }
  }

  componentDidMount() {

    fetch('https://blockchain.info/ticker')
      .then(res => res.json())
      .then(json => this.setState({ price: json.EUR.last }))

  }

  onValueChange(value, currency, priceWithFee) {

    if (isNaN(priceWithFee))
      return;

    if (isNaN(value))
      return;

    if (currency !== 'EUR' && currency !== 'BTC')
      return;

    if (currency === 'EUR')
      console.log(value / priceWithFee)

    if (currency === 'BTC')
      console.log(value * priceWithFee)

  }

  render() {
    const { method, price } = this.state;
    const priceWithFee = (price + (price*0.01)).toFixed(2)
    return (
      <div className="box has-text-centered">

        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <h1 className="title">{price && `1 BTC = ${priceWithFee} Euro`}</h1>
            <label className="label is-medium">Tipo di scambio</label>
            <RadioButton 
              options={typeOptions} 
              onChange={type => this.setState({type})}
            />
            <EuroInput onChange={e => this.onValueChange(e.target.value, 'EUR', priceWithFee)}/>
            <BitcoinInput onChange={e => this.onValueChange(e.target.value, 'BTC', priceWithFee)} />
            <label className="label is-medium">Metodo di contatto</label>
            <RadioButton 
              options={methodOptions} 
              onChange={method => this.setState({method})}
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