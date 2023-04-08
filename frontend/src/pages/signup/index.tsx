import React, { FormEvent, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import logoImg from '../../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { AuthContext } from '@/contexts/AuthContext'
import { toast } from 'react-toastify'

function SignUp() {
  const {signUp} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === "" || email === "" || password === ""){
      toast.error('Preencha todos os campos!');
      return;
    }
    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Realize seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        
        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
          <Input 
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          
          <Link href="/">
            <span className={styles.text}>Ja possui uma conta? Login</span>
          </Link> 
        </div>
      </div>
    </>
  )
}

export default SignUp
