import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
import { useState, useEffect } from "react";

function App() {
  const [busqueda, setBusqueda] =  useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    setPaginaActual(1)
  }, [busqueda])

  useEffect(() => {
    const consutarAPI = async () => {
      if(busqueda === '') return 
      const imagenesPorPagina = 30;
      const key = '5759412-5046ca1f0bcddef48b5e449a7'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await fetch(url)
      const imagenes = await respuesta.json()
      setImagenes(imagenes.hits)

      const CalTotalPag = Math.ceil(imagenes.totalHits / imagenesPorPagina)
      setTotalPaginas(CalTotalPag)

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView()
    }

    consutarAPI();

  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
      const nuevaPaginaActual = paginaActual - 1;
      if(nuevaPaginaActual === 0) return;
      setPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas) return
    setPaginaActual(nuevaPaginaActual)
  }
  
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
        setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
          <ListadoImagenes
            imagenes={imagenes}
          />
          <div className="d-flex justify-content-between">
            <button 
            type="button"
            className="btn btn-info mr-5 mb-5"
            onClick={paginaAnterior}
          >&laquo;Anterior </button>
          <button 
            type="button"
            className="btn btn-info mb-5"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
          </div>
          
      </div>
    </div>
  );
}

export default App;
