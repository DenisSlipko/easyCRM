import '../styles/authorization.css';
import UserStore from '../stores/UserStore';
import LoginForm from './LoginForm';
import React from 'react';

class Autorization extends React.Component {

  async componentDidMount() {
    try{
      let res = await fetch('/isLoggedIn', {
        method:'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success) {
        UserStore.loading  = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn =false;
      }
    }
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn =false;
    }
  }

  async doLogout() {
    try{
      let res = await fetch('/isLoggedIn', {
        method:'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      } 
    }
    catch(e){
      console.log('error');
    }
  }
  render() {
    if(UserStore.loading) {
      return (
        <div> Wait for loading</div>
      );
    } else {
      if(UserStore.isLoggedIn) {
        <div>Hi</div>
      }
      return (
        
        <LoginForm></LoginForm>
    
      );
    }
    
  }
  
}

export default Autorization;