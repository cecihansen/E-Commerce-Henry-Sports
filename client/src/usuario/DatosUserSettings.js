import React, { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {UpdateUser} from '../actions/index.js'
import { connect } from "react-redux";
import './ChangePass.css'

export function UserSettings(props){

    
    const [Datos, setDatos]= useState({
        id: [],
        name: '',
        lastName: '',
        mobilephone: ''
    })

    const confirmarDatos= (e) => {
        setDatos({
          ...Datos,
          [e.target.name]: e.target.value
        });
      }
      const submitDatos = (e) => {
        confirmarDatos({
            name: '',
            lastName: '',
            mobilephone: ''
        });
      
      };

      useEffect(() => {
    
        let usuario = localStorage.getItem('user')
        if (usuario) {
            let usuarioJSON = JSON.parse(usuario)
            let usuarioJSONid = usuarioJSON.id
            setDatos({
                id: usuarioJSONid
            })
        }
    }, [])
     
      
    

    return (
        <div className="contenedorSettings">
    
    <div>
        <form className="container_info_user" 
        onSubmit={ (e) => {
            e.preventDefault()
            props.UpdateUser(Datos)
            
            
            } } >
          <div className="catalogo_bg"></div>
          <h3>Cambiar nombre</h3>
          <div className="new_password">
            <div>
            <input
             type="text"
             className="inputs"
             name="name"
             placeholder="Introduzca su nuevo Nombre"
             onChange={confirmarDatos}
             value={Datos.name}
             
             />
            
            </div>

            <div>
            <h3>Cambiar apellido</h3>
            <input
                type="text"
                name="lastName"
                className="inputs"
                placeholder="Ingrese su apellido"
                onChange={confirmarDatos}
                value={Datos.lastName}
                 
                />
            </div>

            <div>
            <h3>Cambiar numero de celular</h3>
            <input 
                type="phone" 
                name="mobilephone"
                className="inputs"
                placeholder="Ingrese su numero de Telefono"
                onChange={confirmarDatos}
                 value={Datos.mobilephone}
                  />
            </div>

          </div>
          <button onSubmit={submitDatos} type="submit" class="btn btn-primary"> Actualizar Datos </button>
          
    
          <div className="btn_data_user">
            <Link to="/usuario/config/" className="btn_volver_user">
              VOLVER A USER SETTINGS
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
      UpdateUser: title => dispatch(UpdateUser(title))
    };
  }
  
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserSettings)