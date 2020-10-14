import React from 'react';
import './starRating.css'
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const HalfRating = () => {

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const classes = useStyles();
    return (
      <div id="addRw" className="contenedor">
        <h3>
          <strong> ¿Cuántas estrellas le darías?</strong>
        </h3>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

        <div>
          <TextField
            id="standard-textarea"
            label="Dejanos tu comentario..."
            placeholder="Escribe sobre sus características, materiales, color..."
            multiline
          />
        </div>
        <button className="btn btn-primary">Enviar Comentario</button>
      </div>
    );
}

export default HalfRating;




  
    