//@styles
import styles from './Button.module.scss';

type ButtonProps = {
    text: string;
    onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
    return <button className={styles.button} onClick={onClick}>{text}</button>
}

export default Button;