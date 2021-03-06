import React, { Component } from "react";

// Custom components
import Amounts from './Amounts';
import PhoneInput from './PhoneInput';
import RadioButton from './RadioButton';
import TelegramInput from './TelegramInput';

//Logo 
import ok from '../images/ok.png';
//API uris
import { PRICE_API, MAILER_API } from '../api.json';

const typeOptions = ['Compra', 'Vendi'];
const methodOptions = ['Telegram', 'SMS', 'Chiamata'];

const DEALER_FEE = 0.1


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

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    fetch(PRICE_API)
      .then(res => res.json())
      .then(json => this.setState({ price: json.EUR.last }))
      .catch(err => console.log(err))

  }


  onSubmit() {
    const { euro, bitcoin, methodValue, method, type } = this.state;

    if (!euro || !bitcoin || !methodValue)
      return alert('Inserire tutti i campi prima di procedere');


    fetch(MAILER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        euro,
        bitcoin,
        method,
        type,
        contact: methodValue
      }),
    })
      .then((response) => {
        if (response.ok)
          this.setState({ success: true })
        else 
          throw "Something went wrong";
      })
      .catch((error) => {
        alert('Error:', error);
      });


    
  }


  render() {
    const { method, price, success } = this.state;
    const pricePlusFee = Number((price + (price * DEALER_FEE)).toFixed(2));
    const priceMinusFee = Number((price - (price * DEALER_FEE)).toFixed(2));
    console.log(price, priceMinusFee, pricePlusFee);
    const priceWithFee = this.state.type == `Compra` ? pricePlusFee : priceMinusFee;


    if (success)
      return <SuccessScreen euro={this.state.euro} bitcoin={this.state.bitcoin} method={this.state.methodValue} />

    return (
      <div className="box has-text-centered">
        <div className="columns is-desktop is-centered">
          <div className="column is-half">
            <label className="label is-medium">Tipo di scambio</label>


            <RadioButton
              options={typeOptions}
              onChange={type => this.setState({ type })}
            />
            <Amounts priceWithFee={priceWithFee} onChange={({ bitcoin, euro }) => this.setState({ bitcoin, euro })} />
            <h1 className="title">{price && `1 BTC = ${priceWithFee} Euro`}</h1>
            <br />
            <p className="subtitle is-4">
              Ti contatteremo per stabilire una data e luogo di incontro.
            </p>

            <br />


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
              onClick={this.onSubmit}
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
    <br />
    <p className="subtitle"> <b>EUR</b> {Number(euro)} </p>
    <p className="subtitle"> <b>BTC</b> {Number(bitcoin)} </p>
    <p className="subtitle"> <b>Contatto</b> {method} </p>
  </div>
)




export default App;