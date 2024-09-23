import styles from './main.module.scss';


interface ILayout {
    children: JSX.Element
}

const Layout = ({children}: ILayout) => {
    return (
        <div className={styles.layout}>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;