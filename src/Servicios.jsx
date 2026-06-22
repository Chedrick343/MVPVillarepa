import { useState } from "react";
import styles from "./Servicios.module.css";

const servicios = [
    {
        id: 2,
        nombre: "Excavadora",
        icono: "",
        descripcion:
            "Excavación de zanjas, movimiento de tierra y demolición ligera. Equipo moderno con operadores experimentados para garantizar precisión y seguridad.",
        detalles: [
            "Brazo de alcance extendido",
            "Apta para terrenos difíciles",
            "Operador certificado incluido",
        ],
        precio: "₡85,000 / hora",
    },
    {
        id: 6,
        nombre: "Camión",
        icono: "",
        descripcion:
            "Movilización de materiales y equipos para proyectos de construcción, minería y obra civil.",
        detalles: [
            "Diferentes capacidades disponibles",
            "Disponibilidad de cureña y carreta según necesidad",
            "Chofer profesional incluido",
        ],
        precio: "₡100,000 / hora",
    },
];

function Servicios() {
    const [seleccionado, setSeleccionado] = useState(null);

    const handleClick = (servicio) => {
        setSeleccionado(seleccionado?.id === servicio.id ? null : servicio);
    };

    return (
        <section className={styles.servicios}>
            <div className={styles.encabezado}>
                <h2>
                    Nuestros <span>Servicios</span>
                </h2>
                <p>
                    Seleccione un servicio para ver los detalles y tarifas
                    disponibles.
                </p>
            </div>

            <div className={styles.contenido}>
                {/* Lista de servicios */}
                <ul className={styles.lista}>
                    {servicios.map((s) => (
                        <li
                            key={s.id}
                            className={`${styles.item} ${
                                seleccionado?.id === s.id ? styles.activo : ""
                            }`}
                            onClick={() => handleClick(s)}
                        >
                            <span className={styles.icono}>{s.icono}</span>
                            <span className={styles.nombre}>{s.nombre}</span>
                            <span className={styles.flecha}>
                                {seleccionado?.id === s.id ? "▲" : "▶"}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Card de detalle */}
                <div className={`${styles.card} ${seleccionado ? styles.cardVisible : ""}`}>
                    {seleccionado ? (
                        <>
                            <div className={styles.cardEncabezado}>
                                <span className={styles.cardIcono}>
                                    {seleccionado.icono}
                                </span>
                                <h3>{seleccionado.nombre}</h3>
                            </div>

                            <p className={styles.cardDescripcion}>
                                {seleccionado.descripcion}
                            </p>

                            <ul className={styles.cardDetalles}>
                                {seleccionado.detalles.map((d, i) => (
                                    <li key={i}>
                                        <span className={styles.check}>✔</span>{" "}
                                        {d}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.cardPrecio}>
                                <span>Tarifa</span>
                                <strong>{seleccionado.precio}</strong>
                            </div>
                        </>
                    ) : (
                        <div className={styles.cardPlaceholder}>
                            <div className={styles.placeholderIcono}></div>
                            <p className={styles.placeholderTitulo}>
                                Consulte nuestros servicios
                            </p>
                            <p className={styles.placeholderTexto}>
                                Podrá verificar una pequeña descripción de lo que
                                ofrecemos y la tarifa que manejamos por hora.
                                Seleccione cualquier opción de la lista para comenzar.
                            </p>
                            <div className={styles.placeholderPistas}>
                                {servicios.map((s) => (
                                    <span
                                        key={s.id}
                                        className={styles.pista}
                                        onClick={() => setSeleccionado(s)}
                                    >
                                        {s.icono} {s.nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Servicios;