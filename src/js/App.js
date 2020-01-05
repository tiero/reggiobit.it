import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="box has-text-centered">

        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <label className="label is-medium">Tipo di scambio</label>
            <RadioButton options={['Compra', 'Vendi']} />
            <EuroInput />
            <BitcoinInput />
            <label className="label is-medium">Metodo di contatto</label>
            <RadioButton options={['Telegram', 'SMS', 'Chiamata']} />
            <TelegramInput />
            <PhoneInput />
          </div>
        </div>
      </div>
    );
  }
}


class EuroInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Euro</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="💶 Euro da scambiare" />
        </div>
      </div>
    );
  }
}

class BitcoinInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Bitcoin</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="🧙‍♂️ Bitcoin da scambiare" />
        </div>
      </div>
    );
  }
}

class TelegramInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Username Telegram</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="text" placeholder="✈️ @MioUsername" />
        </div>
      </div>
    );
  }
}

class PhoneInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Bitcoin</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="☎️ Numero di cellulare" />
        </div>
      </div>
    );
  }
}





class RadioButton extends Component {

  constructor() {
    super();
    this.state = {
      current: 0
    }
  }

  render() {

    const { current } = this.state;
    const { options } = this.props;

    const selected = `is-active is-primary has-text-white`;

    return (
      <div className="buttons is-centered">
        {
          options.map((option, index) => (
            <button
              key={option}
              className={`button is-large ${current === index && selected}`}
              onClick={() => this.setState({ current: index })}
            >
              {option}
            </button>
          ))
        }
      </div>
    );
  }
}


export default App;