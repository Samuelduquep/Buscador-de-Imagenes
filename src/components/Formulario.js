import React from 'react'
import Error from './Error'
import { useState } from 'react'

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //validar 
        if(termino.trim()===''){
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
            return;
        } 
        setBusqueda(termino)     
    }
  return (
    <form
        onSubmit={buscarImagenes}
    >
      <div className='row'>
        <div className='form-group col-md-8'>
            <input
                type='text'
                className='form-control from-control-lg'
                placeholder='Busca una imagen, ejemplo: Futbol, Coches...'
                onChange={ e => setTermino(e.target.value)}
            />
        </div>
        <div className='form-group col-md-4'>
            <input
                type='submit'
                className='btn btn-lg btn-danger btn-block'
                value='Buscar'
            />
        </div>
      </div>
      {error ? <Error mensaje='Agrega una palabra para tu búsqueda'/> : null}
    </form>
  )
}

export default Formulario
