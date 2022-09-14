import React from 'react'
import { Filtros } from '../components/Filtros'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Listagem } from '../components/Listagem'

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
      <Listagem />
      <Footer />
    </>
  )
}