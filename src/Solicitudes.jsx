import { useState } from "react";
import styles from "./Solicitudes.module.css";

const solicitudesIniciales = [
    { id: 1, nombre: "Juan", apellidos: "Pérez Mora", correo: "juan@gmail.com", celular: "8888-1111", servicio: "Excavadora", fecha: "2026-07-15", horario: "08:00 AM", estado: "Pendiente" },
    { id: 2, nombre: "María", apellidos: "Rodríguez Solís", correo: "maria@gmail.com", celular: "8888-2222", servicio: "Camion", fecha: "2026-07-16", horario: "10:00 AM", estado: "Pendiente" },
    { id: 3, nombre: "Carlos", apellidos: "Jiménez Vargas", correo: "carlos@gmail.com", celular: "8888-3333", servicio: "Camion", fecha: "2026-07-17", horario: "01:00 PM", estado: "Pendiente" },
    { id: 4, nombre: "Laura", apellidos: "Mora Castro", correo: "laura@gmail.com", celular: "8888-4444", servicio: "Camion", fecha: "2026-07-18", horario: "09:00 AM", estado: "Pendiente" },
    { id: 5, nombre: "Fernando", apellidos: "Alvarado Ruiz", correo: "fernando@gmail.com", celular: "8888-5555", servicio: "Camion", fecha: "2026-07-20", horario: "02:00 PM", estado: "Pendiente" },
];

function Solicitudes({ onNavegar }) {
    const [busqueda, setBusqueda] = useState("");
    const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);

    const cambiarEstado = (id, estado) => {
        setSolicitudes((prev) =>
            prev.map((s) => (s.id === id ? { ...s, estado } : s))
        );
    };

    const solicitudesFiltradas = solicitudes.filter((s) =>
        (s.nombre + " " + s.apellidos + " " + s.servicio)
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <h2>Administrador</h2>
                <nav>
                    <button onClick={() => onNavegar("dashboard")}>Dashboard</button>
                    <button className={styles.activo}>Ver solicitudes</button>
                    <button onClick={() => onNavegar("facturas")}>Facturas</button>
                    <button onClick={() => onNavegar("credenciales")}>Gestión de credenciales</button>
                </nav>
            </aside>

            <main className={styles.main}>
                <div className={styles.encabezado}>
                    <div>
                        <h1>Solicitudes</h1>
                        <p>Revise las solicitudes recibidas y acepte o rechace cada una.</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar cliente o servicio..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className={styles.buscar}
                    />
                </div>

                <div className={styles.contenedorTarjetas}>
                    {solicitudesFiltradas.map((solicitud) => (
                        <div
                            key={solicitud.id}
                            className={`${styles.tarjeta} ${
                                solicitud.estado === "Aceptada" ? styles.aceptada : ""
                            } ${
                                solicitud.estado === "Rechazada" ? styles.rechazada : ""
                            }`}
                        >
                            <div className={styles.headerTarjeta}>
                                <h3>{solicitud.nombre} {solicitud.apellidos}</h3>
                                <span className={`${styles.estado} ${
                                    solicitud.estado === "Aceptada" ? styles.estadoAceptado : ""
                                } ${
                                    solicitud.estado === "Rechazada" ? styles.estadoRechazado : ""
                                }`}>
                                    {solicitud.estado}
                                </span>
                            </div>

                            <div className={styles.info}>
                                <p>📧 {solicitud.correo}</p>
                                <p>📞 {solicitud.celular}</p>
                                <p>🚜 {solicitud.servicio}</p>
                                <p>📅 {solicitud.fecha}</p>
                                <p>🕘 {solicitud.horario}</p>
                            </div>

                            {solicitud.estado === "Pendiente" && (
                                <div className={styles.botones}>
                                    <button
                                        className={styles.aceptar}
                                        onClick={() => cambiarEstado(solicitud.id, "Aceptada")}
                                    >
                                        ✔ Aceptar
                                    </button>
                                    <button
                                        className={styles.rechazar}
                                        onClick={() => cambiarEstado(solicitud.id, "Rechazada")}
                                    >
                                        ✖ Rechazar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {solicitudesFiltradas.length === 0 && (
                        <div className={styles.vacio}>
                            <h2>No se encontraron solicitudes.</h2>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Solicitudes;