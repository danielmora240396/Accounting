import classNames from 'classnames';
import styles from './Modal.module.scss';

type ModalProps = {
    closeModal: () => void;
    children?: JSX.Element;
}

const Modal = ({children, closeModal}: ModalProps) => {
    return <div className={styles.modal_container}>
                <div onClick={closeModal} className={styles.backdrop}></div>
                <div className={classNames(styles.modal)}>{children}</div>
            </div>
}

export default Modal;