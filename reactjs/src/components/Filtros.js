import React, { useState } from 'react'
import filtro from '../assets/icones/filtro.svg'

export const Filtros = (props) => {
  const {
    periodoDe, 
    periodoAte, 
    status, 
    setPeriodoDe, 
    setPeriodoAte, 
    setStatus } = props

  const [showFiltros, setShowFiltros] = useState(false)
  
  return (
    <div className="container-filtros">
      <div className="title">
        <span>Tarefas</span>
        <img src={filtro} alt="Filtrar tarefas" 
          onClick={() => setShowFiltros(!setShowFiltros)} />

        <div className="form">
          <div>
            <label>Data prevista de conclusão de:</label>
            <input type="date" value={periodoDe} 
              onChange={event => setPeriodoDe(event.target.value)} />
          </div>

          <div>
            <label>até:</label>
            <input type="date" value={periodoAte} 
              onChange={event => setPeriodoAte(event.target.value)} />
          </div>

          <div className="line" />

          <div>
            <label>Status:</label>
            <select value={status} 
              onChange={event => setStatus(event.target.value)}>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluídas</option>
            </select>
          </div>
        </div>
      </div>

      {showFiltros === true && (
        <div className="filtrosMobile">
          <div>
            <label>Período de:</label>
            <input type="date" />
          </div>
          <div>
            <label>Período até:</label>
            <input type="date" />
          </div>
          <div>
            <label>Status:</label>
            <select>
              <option value={0}>Todas</option>
              <option value={1}>Ativas</option>
              <option value={2}>Concluídas</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}