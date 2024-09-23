import { type transaction } from "../../types/userAccountsType";
import styles from './Transactions.module.scss';

type TransactionsProps = {
    transactions: Record<string, transaction>
}

const Transactions = ({ transactions }: TransactionsProps) => {

    return <table className={styles['transaction-table']}>
        <thead>
            <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(transactions).map((transactionKey) => {
                    return (
                        <tr className={transactions[transactionKey].type.toLocaleLowerCase() === 'expense' ? styles.expense : styles.income} key={transactionKey}>
                            <td>{transactions[transactionKey].type}</td>
                            <td>{transactions[transactionKey].date}</td>
                            <td>{transactions[transactionKey].description}</td>
                            <td>
                                {transactions[transactionKey].amount?.toLocaleString('en-US', {style: 'currency', currency: transactions[transactionKey].currency})}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
}


export default Transactions;