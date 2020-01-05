import React, { Component } from "react";

// Custom components
import Amounts from './Amounts';
import PhoneInput from './PhoneInput';
import RadioButton from './RadioButton';
import TelegramInput from './TelegramInput';

//Logo 
import ok from '../images/ok.png'

const typeOptions = ['Compra', 'Vendi'];
const methodOptions = ['Telegram', 'SMS', 'Chiamata'];

const DEALER_FEE = 0.05


class App extends Component {

  constructor() {
    super();
    this.state = {
      type: typeOptions[0],
      method: methodOptions[0],
      methodValue: null,
      price: null,
      success: false
    }
  }

  componentDidMount() {

    fetch('https://blockchain.info/ticker')
      .then(res => res.json())
      .then(json => this.setState({ price: json.EUR.last }))

  }

  render() {
    
    const { method, price, success } = this.state;
    const priceWithFee = Number((price + (price * DEALER_FEE)).toFixed(2));
    
    if (success)
      return <SuccessScreen euro={this.state.euro} bitcoin={this.state.bitcoin} method={this.state.methodValue} />
    
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
            <Amounts priceWithFee={priceWithFee} onChange={({ bitcoin, euro }) => this.setState({ bitcoin, euro })} />
            <label className="label is-medium">Metodo di contatto</label>
            <RadioButton
              options={methodOptions}
              onChange={method => this.setState({ method })}
            />
            {
              method === methodOptions[0] ?
                <TelegramInput onChange={e => this.setState({ methodValue: e.target.value })} /> :
                <PhoneInput onChange={e => this.setState({ methodValue: e.target.value })} />
            }
            <hr />
            <button
              className="button is-large is-info has-text-white"
              onClick={() => this.setState({ success: true })}
            >
              Invia richiesta
            </button>
          </div>
        </div>
      </div>
    );
  }
}


const SuccessScreen = ({ euro, bitcoin, method }) => (
  <div className="box has-text-centered has-background-light">
    <img src={ok} />
    <h1 className="title"> Richiesta completata con successo! </h1>
    <p className="subtitle"> A breve uno dei nostri operatori si metterà in contatto con te! </p>
    <br />
    <h1 className="title is-6">Riepilogo</h1>
    <p className="subtitle"> <b>EUR</b> {Number(euro)} </p>
    <p className="subtitle"> <b>BTC</b> {Number(bitcoin)} </p>
    <p className="subtitle"> <b>Contatto</b> {method} </p>
  </div>
)




export default App;