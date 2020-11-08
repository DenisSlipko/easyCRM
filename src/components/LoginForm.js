import React from 'react';
import '../styles/authorization.css';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';   
import { reaction } from 'mobx';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property,val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property] : val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password:'',
      buttonDisabled: false
    })
  }

  async doLogin() {
    if(!this.state.username) {
      return;
    }
    if(!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true
    })

    try {
      let res = await fetch('https://deveasycrm.herokuapp.com/',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })

      let result = await res.json();
      if(result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if(result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }
    catch(e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <div className='authorization-container'>
      <p className='crm-title'>Easy CRM</p>
      <p className='line'></p>
      <a className='enter-text' href='#'>Вход</a>
      <InputField
      type='text'
      placeholder='Логин'
      value = {this.state.username ? this.state.username : ''}
      onChange={ (val) => this.setInputValue('username', val)}
      ></InputField>
      <InputField
      type='text'
      placeholder='Пароль'
      value = {this.state.password ? this.state.password : ''}
      onChange={ (val) => this.setInputValue('password', val)}
      ></InputField>
      <SubmitButton
      text={'Вход'}
      disabled={false}
      onClick={() => this.doLogin()}
      ></SubmitButton>
      <a href='#' className='registration-text'>Зарегистрироваться</a>
  </div>
    );
  }
}

export default LoginForm;
