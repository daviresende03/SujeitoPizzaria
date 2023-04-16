import Head from 'next/head'
import styles from './styles.module.scss'
import { Header } from '@/components/Header'
import { FormEvent, useState } from 'react'
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';

export default function Category(){
    const [name,setName] = useState("");

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if(name === ""){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/categories', {
            name: name
        })

        toast.success('Categoria Cadastrada com Sucesso!');
        setName('');
    }


    return (
        <>
            <Head>
                <title>Nova Categoria - SujeitoPizzaria</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input 
                            type="text"
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}