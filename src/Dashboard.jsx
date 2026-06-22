import styles from "./Dashboard.module.css";

const servicios = [
    { id: 2, nombre: "Excavadora", horas: 95, dinero: 8075000, disponibles: 1 },
    { id: 5, nombre: "Camion", horas: 50, dinero: 7500000, disponibles: 1 },
];

const solicitudes = [
    { empresa: "Constructora MECO", servicio: "Excavadora" },
    { empresa: "El Colono", servicio: "Camion" },
    { empresa: "Grupo H Solís", servicio: "Camion" },
    { empresa: "Constructora Herrera", servicio: "Camion" },
    { empresa: "Conansa", servicio: "Camion" },
];

const horasTotales = servicios.reduce((a, b) => a + b.horas, 0);
const dineroTotal = servicios.reduce((a, b) => a + b.dinero, 0);
const servicioMasSolicitado = servicios.reduce((a, b) => (b.horas > a.horas ? b : a));
const solicitudesPendientes = 18;
const ocupacion = 82;

export default function Dashboard({ onNavegar }) {
    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <h2>Administrador</h2>
                <nav>
                    <button className={styles.activo}>Dashboard</button>
                    <button onClick={() => onNavegar("solicitudes")}>Ver solicitudes</button>
                    <button onClick={() => onNavegar("facturas")}>Facturas</button>
                    <button onClick={() => onNavegar("credenciales")}>Gestión de credenciales</button>
                </nav>
            </aside>

            <main className={styles.main}>
                <h1>Dashboard</h1>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <span>⏱ Horas alquiladas</span>
                        <h2>{horasTotales} h</h2>
                    </div>
                    <div className={styles.card}>
                        <span>💰 Ingresos de la semana</span>
                        <h2>₡{dineroTotal.toLocaleString()}</h2>
                    </div>
                    <div className={styles.card}>
                        <span>🚜 Servicio más solicitado</span>
                        <h2>{servicioMasSolicitado.nombre}</h2>
                    </div>
                    <div className={styles.card}>
                        <span>📋 Solicitudes pendientes</span>
                        <h2>{solicitudesPendientes}</h2>
                    </div>
                </div>

                <div className={styles.paneles}>
                    <section className={styles.panel}>
                        <h3>Horas alquiladas por servicio</h3>
                        {servicios.map((servicio) => (
                            <div key={servicio.id} className={styles.item}>
                                <div className={styles.encabezadoItem}>
                                    <span>{servicio.nombre}</span>
                                    <span>{servicio.horas} h</span>
                                </div>
                                <div className={styles.barra}>
                                    <div
                                        className={styles.relleno}
                                        style={{ width: `${(servicio.horas / 120) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className={styles.panel}>
                        <h3>Dinero generado por servicio</h3>
                        {servicios.map((servicio) => (
                            <div key={servicio.id} className={styles.filaDinero}>
                                <span>{servicio.nombre}</span>
                                <strong>₡{servicio.dinero.toLocaleString()}</strong>
                            </div>
                        ))}
                    </section>
                </div>

                <div className={styles.resumen}>
                    <section className={styles.panel}>
                        <h3>Últimas solicitudes</h3>
                        {solicitudes.map((s, index) => (
                            <div key={index} className={styles.solicitud}>
                                <strong>{s.empresa}</strong>
                                <span>{s.servicio}</span>
                            </div>
                        ))}
                    </section>

                    <section className={styles.panel}>
                        <h3>Maquinaria disponible</h3>
                        {servicios.map((servicio) => (
                            <div key={servicio.id} className={styles.disponible}>
                                <span>{servicio.nombre}</span>
                                <strong>{servicio.disponibles}</strong>
                            </div>
                        ))}
                    </section>

                    <section className={styles.panel}>
                        <h3>Ocupación semanal</h3>
                        <div className={styles.ocupacionNumero}>{ocupacion}%</div>
                        <div className={styles.barraGrande}>
                            <div className={styles.relleno} style={{ width: `${ocupacion}%` }} />
                        </div>
                        <p>
                            La maquinaria ha estado ocupada el{" "}
                            <strong>{ocupacion}%</strong> del tiempo disponible
                            durante la semana.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}