import React, { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {ResetPassword, verifyPass} from '../actions/index.js'
import { connect } from "react-redux";
import './ChangePass.css'


export function PasswordSettings(props){

    const [errors, setErrors] = useState({});
    const [contraseña, setContraseña]= useState({
        id: [],
        password: '',
        confirmPassword: '',
        new_password: ''
    })

    const confirmarDatos= (e) => {
        setContraseña({
          ...contraseña,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...contraseña,
          [e.target.name]: e.target.value,
        }));
      }
      const submitPassword = (e) => {
        confirmarDatos({
            password: '',
            confirmPassword: '',
            new_password: ''
        });
      
      };

      useEffect(() => {
    
        let usuario = localStorage.getItem('user')
        if (usuario) {
            let usuarioJSON = JSON.parse(usuario)
            let usuarioJSONid = usuarioJSON.id
            setContraseña({
                id: usuarioJSONid
            })
        }
    }, [])
     
      
    

    return (
        <div className="contenedorChangePass">
    
    <div>
        <form className="container_info_user" 
        onSubmit={ (e) => {
            e.preventDefault()
            props.verifyPass(contraseña)
            props.ResetPassword(contraseña)
            } } >
          <div className="catalogo_bg"></div>
          <h3>Cambiar tu contraseña</h3>
          <div className="new_password">
            <div>
            
            <input
            className="inputs"
             type="password"
             name="password"
             placeholder="Introduzca su contraseña actual"
             onChange={confirmarDatos}
             value={contraseña.password}
             required
             />
            
            </div>
            {errors.new_password && ( <p id="error" className="danger">{errors.new_password}</p> )}
            <input
                className="inputs"
                className={`${errors.password && 'danger'}`}
                type="password"
                name="new_password"
                placeholder="Introduzca su nueva contraseña"
                onChange={confirmarDatos}
                value={contraseña.new_password}
                required 
                />
            
            <input 
                className="inputs"
                type="password" 
                id="newPass"
                name="confirmPassword"
                placeholder="Introduzca nuevamente su nueva contraseña"
                placeholder="Introduzca su nueva contraseña"
                onChange={confirmarDatos}
                value={contraseña.confirmPassword}
                 required />
          </div>
          <button onSubmit={submitPassword} type="submit" class="btn btn-primary"> Cambiar Contraseña </button>
          
    
          <div className="btn_data_user">
            <Link to="/Home" className="btn_volver_user">
              VOLVER AL INICIO
            </Link>
          </div>
        </form>
        </div>

        
        </div>
      );
}


function mapStateToProps(state) {
    return {
      contraseñaCambiada: state.usuarios
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      ResetPassword: title => dispatch(ResetPassword(title)),
      verifyPass: title => dispatch(verifyPass(title))
    };
  }
  
  export function validate(contraseña) {
    let errors = {};
  

  if(!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(contraseña.new_password)) {
    errors.new_password = 'password must have at least one upper case and two numbers';
  }else if(contraseña.new_password !== contraseña.confirmPassword){
    errors.new_password= "Passwords don't match"
  } 
    return errors;
  };
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PasswordSettings)