import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../Layout/main";
import { writeUser, getCurrentUserData, createAccount } from "../firebaseConfig";
import { useState } from "react";
import Accounts from "../components/Accounts/Accounts";
import { type user, type account } from "../types/userAccountsType";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import NewAccountForm from "../components/Forms/newAccountForm/newAccountForm";


enum currency {
    usd = "USD",
    crc = "CRC"
};

enum possibleModals {
    newAccountModal = "newAccountModal"
}

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState<user>({uid: '', email: '', accounts: {}});
    const [modal, setModal] = useState<string>('');

    const fetchCurrentUserData = async () => {
        const currentUserData =  await getCurrentUserData(authCtx.user?.user?.uid || '');
        console.log(currentUserData);
        if(!currentUserData) {
            writeUserData();
        } else {
            setCurrentUser(currentUserData);
        }
    }

    const writeUserData = async () => {
        await writeUser({
            uid: authCtx.user?.user?.uid || '', 
            email: authCtx.user?.user?.email || '',
            accounts: []
        });

        fetchCurrentUserData();
    }

    const openModal = (modal: string) => {
        setModal(modal);
    }

    const closeModal = () => {
        setModal('')
    }

    const modals: Record<string, JSX.Element> = {
        'newAccountModal': <Modal closeModal={closeModal}><NewAccountForm closeModal={closeModal}/></Modal>
    }



    useEffect(() => {
        fetchCurrentUserData();
    }, [authCtx, modal]);

    return (
        <Layout>
            <div>
                <Button text="Create Account" onClick={() => openModal(possibleModals.newAccountModal)} />
                <Button text="Logout" onClick={authCtx.logout} />
                <Accounts fetchData={fetchCurrentUserData} accounts={currentUser.accounts}/>
                {modals[modal]}
            </div>
        </Layout>
    )
}

export default Dashboard