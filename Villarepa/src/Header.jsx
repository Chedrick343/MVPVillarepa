import styles from './Header.module.css';

const links = [
    { id: "inicio",    label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "contacto",  label: "Contacto" },
    { id: "formulario", label: "Formulario" },
];

function Header({ seccionActiva, onNavegar }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Villarepa</h1>
            <nav className={styles.navOptions}>
                {links.map((link) => (
                    <a
                        key={link.id}
                        href="#"
                        className={`${styles.navOption} ${seccionActiva === link.id ? styles.activo : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavegar(link.id);
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Header;