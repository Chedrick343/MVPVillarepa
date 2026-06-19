import styles from "./Informacion.module.css";
import maquinaria from "./assets/hero.png";

function Informacion() {
    return (
        <section className={styles.hero}>

            <div className={styles.info}>

                <h1>
                    Más de <span>10 años</span> brindando servicios de
                    maquinaria pesada
                </h1>

                <p>
                    En Villarepa contamos con amplia experiencia en movimiento
                    de tierras, excavaciones, alquiler de maquinaria pesada y
                    apoyo para proyectos de construcción de cualquier tamaño.
                </p>

                <p>
                    Hemos trabajado junto a empresas como <strong>MECO</strong>,
                    <strong> El Colono</strong> y otros clientes que confían en
                    la calidad y responsabilidad de nuestro trabajo.
                </p>

                <div className={styles.botones}>
                    <button>Ver servicios</button>
                    <button className={styles.secundario}>
                        Contáctenos
                    </button>
                </div>

            </div>

            <div className={styles.imagen}>
                <img src={maquinaria} alt="Maquinaria pesada" />
            </div>

        </section>
    );
}

export default Informacion;