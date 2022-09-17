import React from 'react'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import listaVazia from '../assets/icones/lista-vazia.svg'
import { executaRequisicao } from '../services/api'
import { Item } from './Item'

export const Listagem = (props) => {

  const { tarefas, getTarefasComFiltro } = props
  const [showModal, setShowModal] = useState(false)
  const [idTarefa, setIdTarefa] = useState(null)
  const [nomeTarefa, setNomeTarefa] = useState('')
  const [dataPrevisaoTarefa, setDataPrevisaoTarefa] = useState('')
  const [dataConclusao, setDataConclusao] = useState('')
  const [error, setError] = useState('')

  const selecionarTarefa = (tarefa) => {
    setError('')
    setIdTarefa(tarefa.id)
    setNomeTarefa(tarefa.nome)
    setDataPrevisaoTarefa(moment(tarefa.dataPrevistaConclusao).format('yyyy-MM-DD'))
    setDataConclusao(tarefa.dataConclusao)
    setShowModal(true)
  }

  const atualizarTarefa = async () => {
    try {
      if (!nomeTarefa || !dataPrevisaoTarefa) {
        setError("Favor informar nome e data da previsão")
        return
      }
      const body = { 
        nome: nomeTarefa, 
        dataPrevistaConclusao: dataPrevisaoTarefa,
        dataConclusao: dataConclusao 
      }

      await executaRequisicao('tarefa/'+idTarefa, 'put', body)
      await getTarefasComFiltro()
      setNomeTarefa('')
      setDataPrevisaoTarefa('')
      setDataConclusao('')
      setIdTarefa(null)
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

  const excluirTarefa = async () => {
    try {
      if (!idTarefa) {
        setError("Favor informar a tarefa a ser excluída")
        return
      }
      
      await executaRequisicao('tarefa/'+idTarefa, 'delete')
      await getTarefasComFiltro()
      setNomeTarefa('')
      setDataPrevisaoTarefa('')
      setDataConclusao('')
      setIdTarefa(null)
      setShowModal(false)    

    } catch (e) {
      console.log(e)

      if (e?.response?.data?.erro) {
        setError(e.response.data.erro)
      } else {
        setError('Não foi possível excluir a tarefa, fale com o administrador.')
      }
    }
  }

  return (
    <>
      <div className={"container-listagem " + (tarefas && tarefas.length > 0 ?
        "" : "vazia")}>
        {tarefas && tarefas.length > 0 ?
          tarefas.map(tarefa => <Item key={tarefa.id} tarefa={tarefa}
            selecionarTarefa={selecionarTarefa} />)
          :
          <>
            <img src={listaVazia} alt="Nenhuma atividade encontrada" />
            <p>Você ainda não possui tarefas cadastrada.</p>
          </>
        }
      </div>

      <Modal className="container-modal" show={showModal}
        onHide={() => setShowModal(false)} >
        <Modal.Body>
          <p>Alterar uma tarefa</p>
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
          <input
            type="text"
            name="dataConclusao"
            className="col-12"
            placeholder="Digite de conclusão"
            value={dataConclusao}
            onChange={(event) => setDataConclusao(event.target.value)}
            onFocus={(event) => event.target.type = 'date'}
            onBlur={(event) => dataConclusao ? event.target.type = 'date' : event.target.type = 'text'}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="buttons col-12">
            <button onClick={atualizarTarefa}>Alterar</button>
            <span onClick={excluirTarefa}>Excluir tarefa</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}