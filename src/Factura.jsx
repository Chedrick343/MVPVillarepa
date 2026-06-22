import { useState } from "react";
import styles from "./Factura.module.css";

const historialInicial = [
    { id: "FE-001", cliente: "Constructora MECO", servicio: "Excavadora", monto: 680000, fecha: "2026-06-01", estado: "Aceptada" },
    { id: "FE-002", cliente: "El Colono", servicio: "Camion", monto: 1200000, fecha: "2026-06-05", estado: "Enviada" },
    { id: "FE-003", cliente: "Grupo H Solís", servicio: "Camion", monto: 360000, fecha: "2026-06-10", estado: "Pendiente" },
    { id: "FE-004", cliente: "Constructora Herrera", servicio: "Camion", monto: 440000, fecha: "2026-06-12", estado: "Rechazada" },
    { id: "FE-005", cliente: "Conansa", servicio: "Camion", monto: 560000, fecha: "2026-06-18", estado: "Aceptada" },
];

const estadoConfig = {
    Pendiente:  { color: styles.estadoPendiente,  icono: "🕐" },
    Enviada:    { color: styles.estadoEnviada,     icono: "📤" },
    Aceptada:   { color: styles.estadoAceptada,   icono: "✅" },
    Rechazada:  { color: styles.estadoRechazada,  icono: "❌" },
};

const servicios = ["Excavadora", "Camion"];

function Factura({ onNavegar }) {
    const [vista, setVista] = useState("historial"); // historial | crear | detalle
    const [facturas, setFacturas] = useState(historialInicial);
    const [facturaDetalle, setFacturaDetalle] = useState(null);
    const [errorProveedor, setErrorProveedor] = useState(null);

    // Form nueva factura
    const [form, setForm] = useState({
        cliente: "", correo: "", servicio: "", horas: "", fecha: "",
    });
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errores[name]) setErrores((p) => ({ ...p, [name]: "" }));
    };

    const tarifas = { Vagoneta: 45000, Excavadora: 85000, Montacargas: 55000, Aplanadora: 70000, Grúa: 150000 };

    const calcularMonto = () => {
        if (!form.servicio || !form.horas) return 0;
        return (tarifas[form.servicio] || 0) * Number(form.horas);
    };

    const validar = () => {
        const e = {};
        if (!form.cliente.trim()) e.cliente = "Ingrese el nombre del cliente.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = "Ingrese un correo válido.";
        if (!form.servicio) e.servicio = "Seleccione un servicio.";
        if (!form.horas || isNaN(form.horas) || Number(form.horas) <= 0) e.horas = "Ingrese las horas (número mayor a 0).";
        if (!form.fecha) e.fecha = "Seleccione una fecha.";
        return e;
    };

    // Simula envío al proveedor certificado (Hacienda)
    const simularEnvio = () => {
        // 20% de probabilidad de error del proveedor para demo
        return Math.random() > 0.8 ? "error" : "ok";
    };

    const handleCrear = () => {
        const e = validar();
        if (Object.keys(e).length > 0) { setErrores(e); return; }

        setEnviando(true);
        setErrorProveedor(null);

        setTimeout(() => {
            const resultado = simularEnvio();

            if (resultado === "error") {
                setEnviando(false);
                setErrorProveedor("El proveedor certificado (Hacienda) no respondió o rechazó la solicitud. Verifique su conexión e intente nuevamente.");
                return;
            }

            const nueva = {
                id: `FE-00${facturas.length + 1}`,
                cliente: form.cliente,
                servicio: form.servicio,
                monto: calcularMonto(),
                fecha: form.fecha,
                estado: "Enviada",
            };

            setFacturas((p) => [nueva, ...p]);
            setForm({ cliente: "", correo: "", servicio: "", horas: "", fecha: "" });
            setErrores({});
            setEnviando(false);
            setErrorProveedor(null);
            setVista("historial");
        }, 1400);
    };

    const abrirDetalle = (factura) => {
        setFacturaDetalle(factura);
        setVista("detalle");
    };

    const hoy = new Date().toISOString().split("T")[0];

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2>Administrador</h2>
                <nav>
                    <button onClick={() => onNavegar("dashboard")}>Dashboard</button>
                    <button onClick={() => onNavegar("solicitudes")}>Ver solicitudes</button>
                    <button className={styles.activo}>Facturas</button>
                    <button onClick={() => onNavegar("credenciales")}>Gestión de credenciales</button>
                </nav>
            </aside>

            {/* Main */}
            <main className={styles.main}>

                {/* ── HISTORIAL ── */}
                {vista === "historial" && (
                    <>
                        <div className={styles.encabezado}>
                            <div>
                                <h1>Facturación electrónica</h1>
                                <p>Gestione, emita y consulte el historial de facturas.</p>
                            </div>
                            <button className={styles.btnPrimario} onClick={() => { setErrorProveedor(null); setVista("crear"); }}>
                                + Crear factura
                            </button>
                        </div>

                        {/* Tabla historial */}
                        <div className={styles.panel}>
                            <h3>Historial de facturación</h3>
                            <table className={styles.tabla}>
                                <thead>
                                    <tr>
                                        <th>N° Factura</th>
                                        <th>Cliente</th>
                                        <th>Servicio</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturas.map((f) => {
                                        const cfg = estadoConfig[f.estado];
                                        return (
                                            <tr key={f.id}>
                                                <td className={styles.tdId}>{f.id}</td>
                                                <td>{f.cliente}</td>
                                                <td>{f.servicio}</td>
                                                <td className={styles.tdMonto}>₡{f.monto.toLocaleString()}</td>
                                                <td>{f.fecha}</td>
                                                <td>
                                                    <span className={`${styles.badge} ${cfg.color}`}>
                                                        {cfg.icono} {f.estado}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className={styles.btnDetalle} onClick={() => abrirDetalle(f)}>
                                                        Ver detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* ── CREAR FACTURA ── */}
                {vista === "crear" && (
                    <>
                        <div className={styles.encabezado}>
                            <div>
                                <h1>Nueva factura electrónica</h1>
                                <p>Complete los datos para emitir la factura ante Hacienda.</p>
                            </div>
                            <button className={styles.btnSecundario} onClick={() => setVista("historial")}>
                                ← Volver
                            </button>
                        </div>

                        {/* Error proveedor */}
                        {errorProveedor && (
                            <div className={styles.errorProveedor}>
                                <span className={styles.errorIcono}>⚠️</span>
                                <div>
                                    <strong>Error del proveedor certificado</strong>
                                    <p>{errorProveedor}</p>
                                </div>
                            </div>
                        )}

                        <div className={styles.panel}>
                            <div className={styles.formGrid}>
                                <div className={styles.campo}>
                                    <label>Cliente / Empresa</label>
                                    <input name="cliente" placeholder="Ej. Constructora MECO"
                                        value={form.cliente} onChange={handleChange}
                                        className={errores.cliente ? styles.inputError : ""} />
                                    {errores.cliente && <span className={styles.error}>{errores.cliente}</span>}
                                </div>

                                <div className={styles.campo}>
                                    <label>Correo electrónico</label>
                                    <input name="correo" type="email" placeholder="correo@empresa.com"
                                        value={form.correo} onChange={handleChange}
                                        className={errores.correo ? styles.inputError : ""} />
                                    {errores.correo && <span className={styles.error}>{errores.correo}</span>}
                                </div>

                                <div className={styles.campo}>
                                    <label>Servicio</label>
                                    <select name="servicio" value={form.servicio} onChange={handleChange}
                                        className={errores.servicio ? styles.inputError : ""}>
                                        <option value="">Seleccione un servicio</option>
                                        {servicios.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                    {errores.servicio && <span className={styles.error}>{errores.servicio}</span>}
                                </div>

                                <div className={styles.campo}>
                                    <label>Horas trabajadas</label>
                                    <input name="horas" type="number" min="1" placeholder="Ej. 8"
                                        value={form.horas} onChange={handleChange}
                                        className={errores.horas ? styles.inputError : ""} />
                                    {errores.horas && <span className={styles.error}>{errores.horas}</span>}
                                </div>

                                <div className={styles.campo}>
                                    <label>Fecha del servicio</label>
                                    <input name="fecha" type="date" max={hoy}
                                        value={form.fecha} onChange={handleChange}
                                        className={errores.fecha ? styles.inputError : ""} />
                                    {errores.fecha && <span className={styles.error}>{errores.fecha}</span>}
                                </div>

                                {/* Vista previa del monto */}
                                <div className={styles.campo}>
                                    <label>Monto calculado</label>
                                    <div className={styles.montoPrevia}>
                                        ₡{calcularMonto().toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.accion}>
                                <button className={styles.btnPrimario} onClick={handleCrear} disabled={enviando}>
                                    {enviando ? "Enviando a Hacienda..." : "📤 Emitir factura"}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* ── DETALLE ── */}
                {vista === "detalle" && facturaDetalle && (
                    <>
                        <div className={styles.encabezado}>
                            <div>
                                <h1>Detalle de factura</h1>
                                <p>Información completa de la factura electrónica.</p>
                            </div>
                            <button className={styles.btnSecundario} onClick={() => setVista("historial")}>
                                ← Volver
                            </button>
                        </div>

                        <div className={styles.panel}>
                            <div className={styles.detalleHeader}>
                                <div>
                                    <span className={styles.detalleId}>{facturaDetalle.id}</span>
                                    <h2>{facturaDetalle.cliente}</h2>
                                </div>
                                <span className={`${styles.badge} ${styles.badgeGrande} ${estadoConfig[facturaDetalle.estado].color}`}>
                                    {estadoConfig[facturaDetalle.estado].icono} {facturaDetalle.estado}
                                </span>
                            </div>

                            <div className={styles.detalleGrid}>
                                <div className={styles.detalleItem}>
                                    <span>Servicio</span>
                                    <strong>{facturaDetalle.servicio}</strong>
                                </div>
                                <div className={styles.detalleItem}>
                                    <span>Fecha</span>
                                    <strong>{facturaDetalle.fecha}</strong>
                                </div>
                                <div className={styles.detalleItem}>
                                    <span>Monto total</span>
                                    <strong className={styles.montoDestacado}>₡{facturaDetalle.monto.toLocaleString()}</strong>
                                </div>
                                <div className={styles.detalleItem}>
                                    <span>Estado ante Hacienda</span>
                                    <strong>{facturaDetalle.estado}</strong>
                                </div>
                            </div>

                            {/* Mensaje de rechazo */}
                            {facturaDetalle.estado === "Rechazada" && (
                                <div className={styles.errorProveedor}>
                                    <span className={styles.errorIcono}>⚠️</span>
                                    <div>
                                        <strong>Factura rechazada por el proveedor</strong>
                                        <p>Hacienda o el proveedor certificado rechazó esta factura. Verifique los datos del receptor y vuelva a emitirla. Si el problema persiste, contacte a su proveedor de firma digital.</p>
                                    </div>
                                </div>
                            )}

                            {facturaDetalle.estado === "Enviada" && (
                                <div className={styles.infoProveedor}>
                                    <span>📤</span>
                                    <p>Esta factura fue enviada al proveedor certificado y está pendiente de confirmación por parte de Hacienda.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

export default Factura;