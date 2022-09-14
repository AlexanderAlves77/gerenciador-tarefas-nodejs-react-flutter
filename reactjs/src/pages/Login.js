import React, { useState } from 'react'
import logo from '../assets/icones/fulldevstacks-logo.svg'
import mail from '../assets/icones/mail.svg'
import lock from '../assets/icones/lock.svg'
import { Input } from '../assets/components/Input'
import { executaRequisicao } from '../services/api'

export const Login = (props) => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [msgErro, setMsgErro] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const executaLogin = async (event) => {
    try {
      event.preventDefault()
      setIsLoading(true)
      setMsgErro('')

      const body = { login, senha }

      const resultado = executaRequisicao('login', 'POST', body)
      if(resultado?.data?.token) {
        localStorage.setItem('accessToken', resultado.data.token)
        localStorage.setItem('usuarioNome', resultado.data.nome)
        localStorage.setItem('usuarioEmail', resultado.data.email)
        props.setAccessToken(resultado.data.token)
      }

    } catch (e) {
      console.log(e)

      if (e?.response?.data?.erro) {
        setMsgErro(e.response.data.erro)
      } else {
        setMsgErro('Não foi possível efeturar o login, fale com o administrador.')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="container-login">
      <img src={logo} alt="Logo Fulldevstacks" className="logo" />

      <form>
        {msgErro && <p>{msgErro}</p>}

        <Input
          srcImg={mail}
          altImg={"Icone email"}
          inputType={"text"}
          inputName={"login"}
          placeholder={"Informe seu email"}
          value={login}
          setValue={setLogin}
        />

        <Input
          srcImg={lock}
          altImg={"Icone lock"}
          inputType={"password"}
          inputName={"senha"}
          placeholder={"Informe sua senha"}
          value={senha}
          setValue={setSenha}
        />

        <button onClick={executaLogin} disabled={isLoading}>
          {isLoading === true ? 'Carregando . . .' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}