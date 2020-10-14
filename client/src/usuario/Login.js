import React, { useState, useEffect } from 'react';
import { loginUser } from '../actions/index.js';
import { connect } from "react-redux";
import axios from 'axios';
import './login.css';
import { useHistory } from 'react-router-dom';


export function Login() {



  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const iniciarSesion = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const SubmitUser = (e) => {
    iniciarSesion({
      email: '',
      password: ''
    })
  }

  const handleSubmit = async (event, state) => {
    event.preventDefault()

    loginUser(state)

    history.push("/Home")
  }


  return (
    // agrego action="/login"
    <form action="/login" onSubmit={event => handleSubmit(event, state)} >
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          required
          onChange={iniciarSesion}
          value={state.email}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          onChange={iniciarSesion}
          value={state.password}
        />
      </div>
      <div>
        <button onSubmit={SubmitUser} type="submit" >Sign In </button>
      </div>
    </form>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: title => dispatch(loginUser(title))
  };
}

function mapStateToProps(state) {
  return {
    usuarioGuardado: state.usuarios
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)


