import React from 'react';
import './Input.css';

const Input = (props) => {
  let inputElement;

  // eslint-disable-next-line
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className="InputElement" {...props.elementConfig} value={props.value}
        onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className="InputElement" {...props.elementConfig} value={props.value}
        onChange={props.changed}/>;
      break;
    case ('select'):
    inputElement = (
      <select
        className="InputElement"
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option value={option.value}>{option.displayValue}</option>
        ))}
      </select>
    );
    // default:
    //   inputElement = <textarea className="InputElement" {...props.elementConfig} value={props.value}/>;
    //   break;
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input;
