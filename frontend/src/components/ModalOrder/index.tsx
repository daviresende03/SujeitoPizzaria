import styles from './styles.module.scss'
import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import { orderItemProps } from '@/pages/dashboard';

interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void; //Funcao que retorna void
    order: orderItemProps[];
    handleFinishOrder: (id: string) => void;

}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){
    const cunstomStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%,-50%)',
            backgroundColor: '#1d1d2e'
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={cunstomStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{background: 'transparent', border: 0}}
            >
                <FiX size={45} color='#f34748'/>
            </button>

            <div className={styles.container}>
                <h2>Detalhes do Pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(order[0].order_id)}>
                    Concluir Pedido
                </button>
            </div>
        </Modal>
    )
}