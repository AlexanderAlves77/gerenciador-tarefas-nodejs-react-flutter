import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Filtros } from '../components/Filtros'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Listagem } from '../components/Listagem'
import { executaRequisicao } from '../services/api'

export const Home = (props) => {

  const [tarefas, setTarefas] = useState([])
  const [periodoDe, setPeriodoDe] = useState('')
  const [periodoAte, setPeriodoAte] = useState('')
  const [status, setStatus] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [nomeTarefa, setNomeTarefa] = useState('')
  const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = useState('')
  const [error, setError] = useState('')

  const getTarefasComFiltro = async () => {
    try {
      let filtros = '?status' + status

      if (periodoDe) filtros += '&periodoDe=' + periodoDe

      if (periodoAte) filtros += '&periodoAte=' + periodoAte

      const resultado = await executaRequisicao('tarefa' + filtros, 'get')
      if (resultado && resultado.data) {
        setTarefas(resultado.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const salvarTarefa = async () => {
    try {
      if (!nomeTarefa || !dataPrevisaoTarefa) {
        setError("Favor informar nome e data da previsão")
        return
      }
      const body = { nome: nomeTarefa, dataPrevistaConclusao: dataPrevisaoTarefa }
      await executaRequisicao('tarefa', 'post', body)
      await getTarefasComFiltro()
      setNomeTarefa('')
      setDataPrevisaoTarefa('')
      setShowModal(false)

    } catch (e) {
      console.log(e)

      if (e?.response?.data?.erro) {
        setError(e.response.data.erro)
      } else {
        setError('Não foi possível cadastrar a tarefa, fale com o administrador.')
      }
    }
  }

  useEffect(() => {
    getTarefasComFiltro()
  }, [status, periodoDe, periodoAte])

  const sair = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('usuarioNome')
    localStorage.removeItem('usuarioEmail')
    props.setAccessToken('')
  }

  return (
    <>
      <Header sair={sair} showModal={() => setShowModal(true)}  />
      <Filtros
        periodoDe={periodoDe}
        periodoAte={periodoAte}
        status={status}
        setPeriodoDe={setPeriodoDe}
        setPeriodoAte={setPeriodoAte}
        setStatus={setStatus}
      />
      <Listagem tarefas={tarefas} />
      <Footer showModal={() => setShowModal(true)} />

      <Modal className="container-modal" show={showModal}
        onHide={() => setShowModal(false)} >
        <Modal.Body>
          <p>Adicionar uma tarefa</p>
          {error && <p className="error">{error}</p>}
          <input 
            type="text" 
            name="nome" 
            className="col-12"
            placeholder="Digite o nome da tarefa"
            value={nomeTarefa}
            onChange={(event) => setNomeTarefa(event.target.value)}
          />
          <input 
            type="text" 
            name="dataPrevisao" 
            className="col-12"
            placeholder="Digite data de previsão de conclusão"
            value={dataPrevisaoTarefa}
            onChange={(event) => setDataPrevisaoTarefa(event.target.value)}
            onFocus={(event) => event.target.type = 'date'}
            onBlur={(event) => dataPrevisaoTarefa ? event.target.type = 'date' : event.target.type = 'text'}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons col-12">
            <button onClick={salvarTarefa}>Salvar</button>
            <span onClick={() => {
              setShowModal(false)
              setError('')
              setNomeTarefa('')
              setDataPrevisaoTarefa('')              
            }}>Cancelar</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}