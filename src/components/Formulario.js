import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({guardarTermino}) => {
  const placeholder = 'Busca una imagen, ejemplo: Programacion, React';

  const [busqueda, guardarBusqueda] = useState('');
  const [error, guardarError] = useState(false);

  const buscarImagenes = e =>{
    e.preventDefault();

    if(busqueda.trim() === ''){
      guardarError(true);
      return;
    }
    guardarError(false);

    guardarTermino(busqueda);

  }

  return(
    <form
      onSubmit={buscarImagenes}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={placeholder}
            onChange={e => guardarBusqueda(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error ? <Error mensaje="Ingresa un termino de busqueda!"/> : null}

    </form>
  );
}

Formulario.propTypes = {
  guardarTermino: PropTypes.func.isRequired
}

export default Formulario;
