import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [termino, guardarTermino] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarActual] = useState(1);
  const [totalPaginas, guardarTotal] = useState(1);

  useEffect(() =>{
    const consultarAPI = async () =>{
      if(termino === '') return;

      const apiKey = '17429733-9e508829ec839fe82ae61743b';
      const imgPorPag = 30;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&per_page=${imgPorPag}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);
      //calcular el total de paginas
      guardarTotal(Math.ceil(resultado.totalHits / imgPorPag));

      //scroll up
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});
    }
    consultarAPI();
  }, [termino,totalPaginas,paginaActual]);

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPaginas) return;

    guardarActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          guardarTermino={guardarTermino}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {(paginaActual === 1) ? null
          :
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        }
        {(paginaActual === totalPaginas) ? null
          :
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
