import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { putProducts, deleteProducts } from '../../../actions/index.js';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

import './modificarProducto.css';

export function Modifica(props) {

    const [state, setState] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        imagen: "",
    });

    const [prodGuardados, setProdGuardados] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(productos => {
                setProdGuardados({ productos })
            })
            .catch(error => {
                return error;
            })
    }, [])

    const actualizarEstado = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };


    const submitProducto = (e) => {
        actualizarEstado({
            id: "",
            nombre: "",
            descripcion: "",
            precio: "",
            cantidad: "",
            imagen: "",
        });
    };

    function eliminar(id) {
        deleteProducts(id);
    }

    return (
        <div className="container">
            <div className="buscadorProducto">
                <h3>Buscar producto a modificar</h3>
            </div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Imagen</Table.HeaderCell>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        prodGuardados.productos && prodGuardados.productos.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell> <img src={encontrado.urlImage} className="cimg-fluid" /></Table.Cell>
                                    <Table.Cell>{encontrado.id}</Table.Cell>
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>{encontrado.description}</Table.Cell>
                                    <Table.Cell>${encontrado.price}</Table.Cell>
                                    <Table.Cell>{encontrado.stock}</Table.Cell>
                                    <Table.HeaderCell><Button negative
                                        onClick={() => eliminar(encontrado.id)}
                                    >Eliminar</Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>

            <div className="buscadorProducto">
                <h3>Ingrese los datos que desea modificar</h3>
            </div>
            <div className="modificador">
                <form className="text-left"
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.putProducts(state)
                    }}>

                    <div className="camposformulario">
                        <p className="title">Id: </p>
                        <input
                            type="text" name="id" className="form-control"
                            placeholder="Ingrese id del producto"
                            onChange={actualizarEstado} value={state.id}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Nombre: </p>
                        <input
                            type="text" name="nombre" className="form-control"
                            placeholder="Ingrese nombre del producto"
                            onChange={actualizarEstado} value={state.nombre}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Descripción: </p>
                        <input
                            type="text" name="descripcion" className="form-control"
                            placeholder="Ingrese una descripción"
                            onChange={actualizarEstado} value={state.descripcion}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Precio: </p>
                        <input
                            type="number" name="precio" className="form-control"
                            placeholder="Ingrese Precio"
                            onChange={actualizarEstado} value={state.precio}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Cantidad: </p>
                        <input
                            type="number" name="cantidad" className="form-control"
                            placeholder="Ingrese cantidad"
                            onChange={actualizarEstado} value={state.cantidad}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <label className="title">
                            Cargar imagen:
                        </label>
                    </div>

                    <input
                        type="file" name="imagen" className="form-control-file"
                        id="exampleFormControlFile1"
                        onChange={actualizarEstado} value={state.imagen}
                    />
                    <br /><br /><br />

                    <button onSubmit={submitProducto} type="submit" className="btn btn-primary">
                        Modificar producto
                    </button>
                </form>
            </div>
            <br /><br /><br />
           

        </div >
    );
}

function mapStateToProps(state) {
    return {
        productosModificado: state.putProductModify
    }
}

function mapDispatchToProps(dispatch) {
    return {
        putProducts: title => dispatch(putProducts(title)),
        deleteProducts: title => dispatch(deleteProducts(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modifica)