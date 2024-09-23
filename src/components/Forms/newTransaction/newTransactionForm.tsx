import { useState } from "react";
import SelectInput from "../../SelectInput/SelectInput"
import "react-datepicker/dist/react-datepicker.css"
import TextInput from "../../TextInput/TextInput";
import styles from './newTransactionForm.module.scss';
import { type transaction, type account } from "../../../types/userAccountsType";
//import Button from "../../Button/Button";
import { createTransaction } from "../../../firebaseConfig";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "@components/Button/Button";


type newTransactionProps = {
    selectedAccount: account
    selectedAccountKey: string,
    fetchData: () => void
}

const NewTransactionForm = ({selectedAccount, selectedAccountKey, fetchData} : newTransactionProps) => {
    const authCtx = useContext(AuthContext);
    const currentDate = new Date();
    const initialState = {
        type: 'Expense',
        date: new Date(currentDate).toLocaleDateString("es-CR", {day: 'numeric', month: 'short', year: 'numeric'}),
        description: '',
        amount: 0,
        currency: selectedAccount.currency || 'CRC'
    }
    const [newTransaction, setNewTransaction] = useState<transaction>(initialState);


    const insertTransaction = async (e: React.FormEvent) => {
        e.preventDefault()
        if(newTransaction.amount && newTransaction.description) {
            const response = await createTransaction(authCtx.user?.user?.uid || '', selectedAccountKey, {...newTransaction, date: new Date(newTransaction.date).toLocaleDateString("es-CR", {day: 'numeric', month: 'short', year: 'numeric'})});
            if(response.success) {
                setNewTransaction(initialState);
                fetchData();
            }
        }
    }
    
    return (
       <form onSubmit={insertTransaction} className={styles.newTransactionForm}>
            <SelectInput
                options={[{label: 'Expense', value: 'Expense'}, {label: 'Income', value: 'Income'}]} 
                value={newTransaction.type} onChange={(e) => {setNewTransaction({...newTransaction, type: e.target.value})}}/>
                <TextInput value={newTransaction.date} onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})} type="date" placeholder="dd/mm/yyyy" />
                <TextInput value={newTransaction.description} onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})} type="text" placeholder="Description"/>
                <TextInput value={newTransaction.amount?.toString()} onChange={(e) => setNewTransaction({...newTransaction, amount: +e.target.value})} type="number" placeholder="Amount"/>
                { selectedAccount.type.toLowerCase() === 'credit' &&
                <SelectInput
                    value={newTransaction.currency ?? 'USD'}
                    onChange={(e) => setNewTransaction({...newTransaction, currency: e.target.value})}
                    options={[{label: 'USD', value: 'USD'}, {label: 'CRC', value: 'CRC'}]}/> }
                <Button text="Add" onClick={() => console.log(newTransaction)}/>
       </form>
    )
}   

export default NewTransactionForm;