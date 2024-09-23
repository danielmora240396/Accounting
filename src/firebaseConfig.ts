// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, get, push } from "firebase/database";
import { type user, type account, type transaction } from "./types/userAccountsType";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoiSZWUcRf7KRjzv5ZlFki2gaXQCi59uk",
  authDomain: "accounting-ccd82.firebaseapp.com",
  databaseURL: "https://accounting-ccd82-default-rtdb.firebaseio.com",
  projectId: "accounting-ccd82",
  storageBucket: "accounting-ccd82.appspot.com",
  messagingSenderId: "189162472645",
  appId: "1:189162472645:web:676ce1490b3512dcc51cac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const authenticateUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            ...user
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

const writeUser = async (data: user) => {
   try {
       await set(ref(db, 'users/' + data.uid), data);
       return {
           success: true
       }
   } catch (error) {
         return {
              success: false,
              message: error.message
         }
    }
}

const getCurrentUserData = async (uid: string) => {
    try {
        const user = await get(ref(db, 'users/' + uid));
        return user.val();
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }
    }
}

const createAccount = async (uid: string, accountData: account) => {
    try {
        await push(ref(db, 'users/' + uid + '/accounts'), {
            ...accountData,
            transactions: []
        });
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

const createTransaction = async (uid: string, accountKey: string, transactionData: transaction) => {
    try {
        await push(ref(db, 'users/' + uid + '/accounts/' + accountKey + '/transactions'), transactionData);
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

const fetchAccount = async (uid: string, accountKey: string) => {
    try {
        const account = await get(ref(db, 'users/' + uid + '/accounts/' + accountKey));
        return account.val();
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}


export { 
    app, 
    authenticateUserWithEmailAndPassword, 
    writeUser, 
    getCurrentUserData,
    createAccount,
    createTransaction,
    fetchAccount
};