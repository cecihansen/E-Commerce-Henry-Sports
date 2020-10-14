import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Domicilio} from '../actions/index.js'
import {useHistory} from 'react-router-dom';

export function Domicilios(props){


  const[domicilio, setDomicilio]= useState({
    Pais: '',
    Provincia: '',
    localidad: '',
    Direccion: '',
    Altura: '',
    CodigoPostal: ''
  })

  const [errors, setErrors] = useState({});
 
  //Funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarEstado = (e) => {
    setDomicilio({
      ...state,
      [e.target.name]: e.target.value, //modifica el valor del input y lo guarda en actualizarState
    });
    setErrors(validate({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  
  const submitUser = (e) => {
    actualizarEstado({
        Pais: '',
        Provincia: '',
        localidad: '',
        Direccion: '',
        Altura: '',
        CodigoPostal: ''
    });
  
  };


    return(
        <div>
            <form onSubmit={ (e) => {
                e.preventDefault()
                props.Domicilio(state)
                
            }}>
        

<div className= "Name">
            <span className="material-icons"> person </span>
              <input
                type="text"
                name="name"
                className="inputs"
                placeholder="Ingrese su nombre"
                onChange={actualizarEstado}
                value={domicilio.Pais}
                required
              />
           
            </div>
            <br /><br />
  
            <div className= "Lastname" >
            
              <input
                type="text"
                name="lastName"
                className="inputs"
                placeholder="Ingrese su apellido"
                onChange={actualizarEstado}
                value={domicilio.Provincia}
                required
              />
           
            </div>
            
            <div >
            
              <input
                type="text"
                name="email"
                className="inputs"
                placeholder="Ingrese su email"
                onChange={actualizarEstado}
                value={domicilio.localidad}
                required
              />
              
            </div>
           
  

            <div >
            
              <input
                type="password"
                name="password"
                className="inputs"
                placeholder="Ingrese su contraseña"
                onChange={actualizarEstado}
                value={domicilio.Direccion}
                required
              />
              
            </div>
            
            <div >
              <input
                type="password"
                name="confirmPassword"
                className="inputs"
                placeholder="Introduzca su contraseña nuevamente"
                onChange={actualizarEstado}
                value={domicilio.Altura}
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="mobilephone"
                className="inputs"
                placeholder="Ingrese su numero de Telefono"
                onChange={actualizarEstado}
                value={domicilio.CodigoPostal}
                required
              />
            </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      usuarioGuardado: state.usuarios
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      Domicilio: title => dispatch(Domicilio(title))
    };
  }


export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Domicilios)