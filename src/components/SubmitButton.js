import React from 'react';
import '../styles/authorization.css';

class SubmitButton extends React.Component {
  render() {
    return (
      <button 
        className='enter-btn'
        disabled={this.props.disabled}
        onClick={() => this.props.onClick()}
      >{this.props.text}</button>
    );
  }
}

export default SubmitButton;
