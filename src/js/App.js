import React, { Component } from "react";

const typeOptions = ['Compra', 'Vendi'];
const methodOptions = ['Telegram', 'SMS', 'Chiamata'];


class App extends Component {

  constructor() {
    super();
    this.state = {
      type: typeOptions[0],
      method: methodOptions[0]
    }
  }

  render() {
    const { method } = this.state;
    return (
      <div className="box has-text-centered">

        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <label className="label is-medium">Tipo di scambio</label>
            <RadioButton 
              options={typeOptions} 
              onChange={type => this.setState({type})}
            />
            <EuroInput onChange={e => console.log(e.target.value)}/>
            <BitcoinInput onChange={e => console.log(e.target.value)} />
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

class PhoneInput extends Component {
  render() {
    const invalid = false && "is-danger";
    return (
      <div className="field">
        <label className="label is-medium">Telefono</label>
        <div className="control is-large">
          <input className={`input is-large ${invalid}`} type="number" placeholder="☎️ Numero di cellulare" onChange={this.props.onChange}/>
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
              onClick={() => {
                this.setState({ current: index });
                this.props.onChange(option)
              }}
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