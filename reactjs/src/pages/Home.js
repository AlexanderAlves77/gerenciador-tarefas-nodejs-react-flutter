import React from 'react'
import { Filtros } from '../components/Filtros'
import { Header } from '../components/Header'

export const Home = (props) => {
  const sair = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('usuarioNome')
    localStorage.removeItem('usuarioEmail')
    props.setAccessToken('')
  }

  return (
    <>
      <Header sair={sair} />
      <Filtros />
    </>
  )
}