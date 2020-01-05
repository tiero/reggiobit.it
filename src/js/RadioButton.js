import React, { Component } from "react";


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


export default RadioButton;

