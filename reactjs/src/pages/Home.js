import React, { useState } from 'react'
import { Filtros } from '../components/Filtros'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Listagem } from '../components/Listagem'

export const Home = (props) => {

  const [tarefas, setTarefas] = useState([
    {
      id: "52vmkwab45wvwr",
      nome: "Tarefa Mock 1",
      dataPrevisaoConclusao: "2022-10-31",
      dataConclusao: null
    },
    {
      id: "69wvwjbwr77vma",
      nome: "Tarefa Mock 2",
      dataPrevisaoConclusao: "2022-10-31",
      dataConclusao: "2022-09-20"
    }
  ])

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
      <Listagem tarefas={tarefas} />
      <Footer />
    </>
  )
}