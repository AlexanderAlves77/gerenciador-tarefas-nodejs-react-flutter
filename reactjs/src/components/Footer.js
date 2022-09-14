import React from 'react'
import adicionar from '../assets/icones/adicionar.svg'

export const Footer = () => {
  return (
    <div className="container-footer">
      <button><img src={adicionar} alt="Adicionar tarefa" /> 
        Adicionar uma tarefa</button>
        <span>© Copyright {new Date().getFullYear()} Fulldevstacks. 
          Todos os direitos reservados.</span>
    </div>
  )
}