//@styles
import Button from '../../Button/Button';
import SelectInput from '../../SelectInput/SelectInput';
import TextInput from '../../TextInput/TextInput';
import styles from './newAccountForm.module.scss';
import { createAccount } from '../../../firebaseConfig';
import { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { type account } from '../../../types/userAccountsType';

enum currency {
    usd = "USD",
    crc = "CRC"
};

enum type {
    credit = "credit",
    debit = "debit"
}

type newAccountFormProps = {
    closeModal?: () => void;
}


const NewAccountForm = ({ closeModal }: newAccountFormProps) => {

    const [newAccount, setNewAccount] = useState<account>({ number: '', description: '', transactions: [], type: type.credit, currency: currency.crc });
    const authCtx = useContext(AuthContext);

    const createAccountHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createAccount(authCtx.user?.user?.uid || '', newAccount);
        console.log(response);
        if(response.success && closeModal) {
            closeModal();
        }
    }
    

    return <div className={styles.form_container}>
        <h2>New Account</h2>
        <form onSubmit={createAccountHandler} className={styles.form}>
            <TextInput onChange={(e) => setNewAccount({...newAccount, number: e.target.value})} value={newAccount.number} label="Account Number" type="text" placeholder='Account Number' />
            <TextInput onChange={(e) => setNewAccount({...newAccount, description: e.target.value})} value={newAccount.description} label="Description" type="text" placeholder='Description' />
            <div className={styles.select_fields}>
                <SelectInput 
                    label="Account type" options={[{ value: type.credit, label: type.credit }, { value: type.debit, label: type.debit }]} 
                    value={newAccount.type} 
                    onChange={(e) => setNewAccount({...newAccount, type: e.target.value})} />
                <SelectInput 
                    label="Account currency" 
                    options={[{ value: currency.usd, label: currency.usd }, { value: currency.crc, label: currency.crc }]} 
                    value={newAccount.currency} 
                    onChange={(e) => setNewAccount({...newAccount, currency: e.target.value})} />
            </div>
            <Button text='Create Account'/>
        </form>
    </div>
}


export default NewAccountForm;