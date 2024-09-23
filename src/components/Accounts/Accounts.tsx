import { useEffect, useState, useContext } from "react";
import { type account } from "../../types/userAccountsType"; 
import styles from './Accounts.module.scss';
import classNames from "classnames";
import NewTransactionForm from "../../components/Forms/newTransaction/newTransactionForm";
import Modal from "../Modal/Modal";
import Transactions from "../Transactions/Transactions";
import { fetchAccount } from "../../firebaseConfig";
import AuthContext from "../../context/AuthContext";


type AccountsProps = {
    accounts: Record<string, account>
    fetchData: () => void
}

const Accounts = ({ accounts, fetchData }: AccountsProps) => {

    const [selectedAccount, setSelectedAccount] = useState<account | null>(null);
    const [selectedAccountKey, setSelectedAccountKey] = useState<string>('');
    const authCtx = useContext(AuthContext);

    const selectAccountHandler = (key: string) => {
        setSelectedAccountKey(key);
        setSelectedAccount(accounts[key]);
    };

    const closeModalHandler = () => {
        setSelectedAccount(null);
    };

    const getDataForAccount = async () => {
        const response = await fetchAccount(authCtx?.user?.user.uid, selectedAccountKey);
        setSelectedAccount(response);
    }

    useEffect(() => {
        fetchData();
    }, [selectedAccountKey, selectedAccount])

    
    return (
        <>
            <div className={styles.container}>
                <h1>My accounts</h1>
                { accounts && <div>
                    <table className={styles.accounts}>
                        <tbody>
                        <tr>
                            <th>Account Number</th>
                            <th>Description</th>
                            <th>Currency</th>
                            <th>Type</th>
                        </tr>
                        {
                            Object.keys(accounts).map((accountKey) => {
                                if(accounts[accountKey].type === 'debit') {
                                    return (
                                        <tr onClick={() => selectAccountHandler(accountKey)} className={classNames(styles.account)} key={accountKey}>
                                            <td>{accounts[accountKey].number}</td>
                                            <td>{accounts[accountKey].description}</td>
                                            <td>{accounts[accountKey].currency}</td>
                                            <td>{accounts[accountKey].type.toLocaleUpperCase()}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </table>
                    <table className={styles.accounts}>
                        <tbody>
                        <tr>
                            <th>Account Number</th>
                            <th>Description</th>
                            <th>Currency</th>
                            <th>Type</th>
                        </tr>
                        {
                            Object.keys(accounts).map((accountKey) => {
                                if(accounts[accountKey].type === 'credit') {
                                    return (
                                        <tr onClick={() => selectAccountHandler(accountKey)} className={styles.account} key={accountKey}>
                                            <td>{accounts[accountKey].number}</td>
                                            <td>{accounts[accountKey].description}</td>
                                            <td>{accounts[accountKey].currency}</td>
                                            <td>{accounts[accountKey].type.toLocaleUpperCase()}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </table>
                </div>}
            </div>
            {
                selectedAccount && 
                <Modal closeModal={closeModalHandler}>
                   <>
                    {selectedAccount.description && <h3>{selectedAccount.description} | {selectedAccount.currency}</h3>}
                    <NewTransactionForm fetchData={getDataForAccount} selectedAccount={selectedAccount} selectedAccountKey={selectedAccountKey}/>
                    { selectedAccount.transactions && <Transactions transactions={selectedAccount.transactions}/> }
                   </>
                </Modal>
            }
        </>
    )
}

export default Accounts;