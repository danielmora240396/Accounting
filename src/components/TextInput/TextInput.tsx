//@styles

import styles from './TextInput.module.scss';

type TextInputProps = {
    label?: string;
    placeholder?: string;
    value?: string | Date;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

const TextInput = ({ label, value, onChange, type, placeholder }: TextInputProps) => {
    return (
        <div className={styles.custom_input}>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
            <label>{label}</label>
        </div>
    );
}

export default TextInput;