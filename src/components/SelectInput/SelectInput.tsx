import styles from './SelectInput.module.scss';

type SelectInputProps = {
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label?: string;
};

const SelectInput = ({ options, value, onChange, label }: SelectInputProps) => {
    return (
        <div className={styles.select_input_container}>
            <label className={styles.custom_select}>{label}</label>
            <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label.toUpperCase()}
                </option>
            ))}
        </select>
        </div>
    );
};

export default SelectInput;