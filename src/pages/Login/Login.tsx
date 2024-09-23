import { useContext, useState } from 'react';
import { authenticateUserWithEmailAndPassword } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Layout from '../../Layout/main';
import styles from './Login.module.scss';

const Login = () => {
    const [username, setUsername] = useState('d.mora240396@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState({error: false, message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
        setError({error: false, message: ''});
        setTimeout(async () => {
            const user = await authenticateUserWithEmailAndPassword(username, password);
            if(user.success) {
                authCtx.setAuth(user, user['_tokenResponse'].idToken, user['_tokenResponse'].refreshToken);
                navigate('/dashboard');
            } else {
                setError({error: true, message: user.message});
            }
    
            setIsLoading(false);
        }, (1000));
     }

    return (
        <Layout>
            <div className={styles.login}>
                <h1>Accounting</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error.error && <div className={styles.error}>{error.message}</div>}
                    {isLoading ? <p>Loading...</p> : <button disabled={isLoading} type="submit">Login</button>}
                </form>
            </div>
        </Layout>
             
    );
}

export default Login;