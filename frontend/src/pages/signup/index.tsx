import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import logoImg from '../../../public/logo.svg'
import styles from '../../styles/home.module.scss'

function SignUp() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Realize seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        
        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form>
          <Input 
              placeholder="Digite seu nome"
              type="text"
            />
            <Input 
              placeholder="Digite seu email"
              type="text"
            />
            <Input
              placeholder="Sua senha"
              type="password"
            />
            <Button
              type="submit"
              loading={false}
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
