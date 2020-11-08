import React from 'react';
import '../styles/authorization.css';


class InputField extends React.Component {
  render() {
    return (
      <input 
        type={this.props.type}
        name="name" 
        value={this.props.value}
        placeholder={this.props.placeholder} 
        className='input'
        onChange={(e) => this.props.onChange(e.target.value)}
        />
    );
  }
}

export default InputField;
