import styles from './Header.module.css';
function Header(){

    return(    
        <header className={styles.header}>
            <h1 className={styles.title}>Villarepa</h1>
            <nav className = {styles.navOptions}>
                <a href="#" className={styles.navOption}>Inicio</a>
                <a href="#" className={styles.navOption}>Productos</a>
                <a href="#" className={styles.navOption}>Contacto</a>
                <a href="#" className={styles.navOption}>Formulario</a>
            </nav>
        </header>
    )
}
export default Header;