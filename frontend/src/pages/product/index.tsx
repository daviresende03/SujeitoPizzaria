import { FiUpload } from 'react-icons/fi'
import { canSSRAuth } from '@/utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { ChangeEvent, useState, FormEvent } from 'react'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarImg, setAvatarImg ] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState(categoryList || []);
    const [selectedCategory, setSelectedCategory] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.files){
            return;
        }
        const image = e.target.files[0];
        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setAvatarImg(image);
            setAvatarUrl(URL.createObjectURL(image))
        }
    }

    function handleCategory(e){
        const index = e.target.value as number;
        setSelectedCategory(index);
    }

    async function handleRegister(e: FormEvent){
        e.preventDefault();

        try{
            let data = new FormData();
            if(name === '' || price === '' || description === '' || avatarImg === null){
                toast.error('Preencha todos os campos!');
                return;
            }
            data.append('name',name);
            data.append('price',price);
            data.append('description',description);
            data.append('category_id',categories[selectedCategory].id);
            data.append('file',avatarImg);

            const apiClient = setupAPIClient();
            await apiClient.post('/products',data);
            toast.success('Cadastrado com Sucesso!');

        }catch(err){
            toast.error('Não foi possível cadastrar!');
        }

        setSelectedCategory(0);
        setName('');
        setPrice('');
        setDescription('');
        setAvatarImg({});
        setAvatarUrl('');
    }

    return (
        <>
            <Head>
                <title>Novo Produto - SujeitoPizzaria</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span><FiUpload size={30} color='#FFF'/></span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                            {avatarUrl && (
                                <img 
                                className={styles.preview}
                                alt="Foto do produto"
                                src={avatarUrl}
                                width={250}
                                height={250}
                            />
                            )}
                        </label>

                        <select value={selectedCategory} onChange={handleCategory}>
                            {categories.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <input
                            type="text"
                            placeholder="Nome do item"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Valor"
                            className={styles.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição..."
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

//Executado na parte servidor antes da tela carregar 
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/categories');

    return {
        props: {
            categoryList: response.data
        }
    }
})