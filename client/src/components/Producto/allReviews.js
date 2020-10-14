import React, { useState, useEffect } from "react";
import "./starRating.css";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FaStar } from "react-icons/fa";

const AllReviews = () => {
    const [state, setState] = useState({
        reviews: []
    })

    var url = window.location.href;
    var separarUrl = url.split("/");
    var tomarUltValor = separarUrl.pop();
    var urlreal = `http://localhost:3000/product//${tomarUltValor}/review`;

    useEffect(() => {
        fetch(urlreal)
        .then(response => response.json())
        .then(reviews => {
            setState({
                    ...state,
                    reviews: reviews 
                })
            });
    },[])

    return (
        <div className="opiniones">
            <h2>Opiniones sobre el Producto</h2>
            <div>
                {state.reviews.map(rw => {
                    return(
                        <div>
                        <h6>{rw.description}</h6>
                        {rw.star == 5}
                        <div className='item_list_rev_container'>
                            <div className='item_list_ranking'>
                            {[...Array(rw.star)].map((star, i) => {
                                return (
                                    <label>
                                    <FaStar
                                        className="star"
                                        color={"#ffc107"}
                                        size={25}
                                    />
                                    </label>
                                );
                            })}
                            </div>
                            
                        </div>   
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default AllReviews;