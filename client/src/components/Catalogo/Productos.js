import ProductCatalogo from './ProductCatalogo.js';
import SearchBar from "../Buscar/SearchBar.js";
import AllProducts from './allProducts.js';
import React, { useState, useEffect } from "react";
import "./productCatalogo.css";
import { connect } from "react-redux";
import { getProductsByCategory } from '../../actions/index.js';


export function Productos(props) {
    /*   const [categoria, setCategoria] = useState([]); */
    const [state, setState] = useState({
        categoria: [],
        productos: []
    });

    const [botonCat, setbotonCat] = useState({
        listaCat: []
    })

    function ocultar() {
        var all = document.getElementById('allprods');
        all.style.display = "none"
        var look = document.getElementById('cardslook');
        look.style.display = "none"
    }

    function mostrar() {
        var mos = document.getElementById('catprods');
        mos.style.display = "flex";
    }

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(productos => {
            var newProp = "count"
           productos.map(prod => {
               prod[newProp] = 0;
           })


        setState({
                ...state,
                productos: productos 
            })
        })
        .catch(error => {
            return error;
        })

        fetch(`http://localhost:3000/products/category`)
            .then(response => response.json())
            .then(json => {
                setbotonCat({
                    listaCat: json
                })
            })
            .catch(error => {
                return error;
            });
    }, [])

    return (

        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <form onSubmit={(e) => {
                e.preventDefault();
                /* setCategoria(""); */
                props.getProductsByCategory(state.categoria);
                ocultar();
                mostrar();
            }}>
                <ul className="navfilter">
                    {
                        botonCat.listaCat && botonCat.listaCat.map(boton => {
                            return (
                                <li className="nav-item">
                                    <button className="botonfilter" type="submit" value={boton.name}
                                        onClick={e => {
                                            setState({
                                                ...state,
                                                categoria: boton.name 
                                            })

                                        }}
                                    >{boton.name}</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <ProductCatalogo props={state, props.category[0]} />
            </form>
            {<SearchBar/>}
            {state.productos && <AllProducts props={state} />}
            {state.categorias && <ProductCatalogo props={state, props.category[0]} />}

        </div >

    );
}

function mapStateToProps(state) {
    return {
        category: state.categoryLoaded,
        products: state.products
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getProductsByCategory: title => dispatch(getProductsByCategory(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Productos)