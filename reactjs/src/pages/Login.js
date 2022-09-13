import React, { useState } from 'react'
import logo from '../assets/icones/fulldevstacks-logo.svg'
import mail from '../assets/icones/mail.svg'
import lock from '../assets/icones/lock.svg'
import { Input } from '../assets/components/Input'

export const Login = () => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const executaLogin = (event) => {
    event.preventDefault()
    setIsLoading(true)
    console.log('login', login)
    console.log('senha', senha)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="container-login">
      <img src={logo} alt="Logo Fulldevstacks" className="logo" />

      <form>
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