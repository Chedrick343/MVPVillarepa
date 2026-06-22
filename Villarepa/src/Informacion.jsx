import styles from "./Informacion.module.css";
import maquinaria from "./assets/hero.jpg";
import maquinaria2 from "./assets/hero2.jpg";

function Informacion() {
    return (
        <>
            {/* ── SECCIÓN 1: texto izquierda, imagen derecha ── */}
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
                    </div>
                </div>

                <div className={styles.imagen}>
                    <img src={maquinaria} alt="Maquinaria pesada" />
                </div>
            </section>

            {/* ── SECCIÓN 2: imagen izquierda, texto derecha ── */}
            <section className={`${styles.hero} ${styles.heroInvertido}`}>
                <div className={styles.imagen}>
                    <img src={maquinaria2} alt="Equipo en operación" />
                </div>

                <div className={`${styles.info} ${styles.infoDerecha}`}>
                    <span className={styles.etiqueta}>¿Por qué elegirnos?</span>

                    <h2>
                        Potencia, precisión y <span>compromiso</span> en cada
                        proyecto
                    </h2>

                    <p>
                        Cada obra tiene su propio ritmo, y nosotros nos adaptamos
                        a él. Nuestro equipo llega a tiempo, trabaja con seguridad
                        y no se va hasta que el trabajo está bien hecho.
                    </p>

                    <ul className={styles.lista}>
                        <li>
                            <span className={styles.check}>✔</span>
                            Operadores certificados con amplia experiencia en campo
                        </li>
                        <li>
                            <span className={styles.check}>✔</span>
                            Flota moderna con mantenimiento preventivo continuo
                        </li>
                        <li>
                            <span className={styles.check}>✔</span>
                            Disponibilidad 6 días a la semana, con respuesta rápida
                        </li>
                        <li>
                            <span className={styles.check}>✔</span>
                            Presupuesto sin compromiso en menos de 24 horas
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Informacion;