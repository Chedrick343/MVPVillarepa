import { useState } from "react";
import styles from "./Credenciales.module.css";

function Credenciales({ onNavegar }) {
    const [form, setForm] = useState({
        usuarioActual: "",
        contrasenaActual: "",
        contrasenaNueva: "",
        repetirContrasena: "",
    });
    const [mostrar, setMostrar] = useState({
        actual: false, nueva: false, repetir: false,
    });
    const [errores, setErrores] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        if (errores[name]) setErrores((p) => ({ ...p, [name]: "" }));
    };

    const toggle = (campo) => setMostrar((p) => ({ ...p, [campo]: !p[campo] }));

    const validar = () => {
        const e = {};
        if (!form.usuarioActual.trim()) e.usuarioActual = "Ingrese su usuario actual.";
        if (!form.contrasenaActual) e.contrasenaActual = "Ingrese su contraseña actual.";
        if (form.contrasenaNueva.length < 6) e.contrasenaNueva = "La nueva contraseña debe tener al menos 6 caracteres.";
        if (form.contrasenaNueva !== form.repetirContrasena) e.repetirContrasena = "Las contraseñas no coinciden.";
        return e;
    };

    const handleConfirmar = () => {
        const e = validar();
        if (Object.keys(e).length > 0) { setErrores(e); return; }
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
            setGuardado(true);
            setForm({ usuarioActual: "", contrasenaActual: "", contrasenaNueva: "", repetirContrasena: "" });
            setTimeout(() => setGuardado(false), 3500);
        }, 900);
    };

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2>Administrador</h2>
                <nav>
                    <button onClick={() => onNavegar("dashboard")}>Dashboard</button>
                    <button onClick={() => onNavegar("solicitudes")}>Ver solicitudes</button>
                    <button onClick={() => onNavegar("facturas")}>Facturas</button>
                    <button className={styles.activo}>Gestión de credenciales</button>
                </nav>
            </aside>

            {/* Main */}
            <main className={styles.main}>
                <div className={styles.encabezado}>
                    <div>
                        <h1>Gestión de credenciales</h1>
                        <p>Actualice su usuario y contraseña de acceso al panel.</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardIcono}>🔑</div>

                    {/* Usuario actual */}
                    <div className={styles.campo}>
                        <label>Usuario actual</label>
                        <input
                            name="usuarioActual"
                            type="text"
                            autoComplete="username"
                            placeholder="Ingrese su usuario actual"
                            value={form.usuarioActual}
                            onChange={handleChange}
                            className={errores.usuarioActual ? styles.inputError : ""}
                        />
                        {errores.usuarioActual && <span className={styles.error}>{errores.usuarioActual}</span>}
                    </div>

                    <div className={styles.divisor} />

                    {/* Contraseña actual */}
                    <div className={styles.campo}>
                        <label>Contraseña actual</label>
                        <div className={styles.passWrapper}>
                            <input
                                name="contrasenaActual"
                                type={mostrar.actual ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Ingrese su contraseña actual"
                                value={form.contrasenaActual}
                                onChange={handleChange}
                                className={errores.contrasenaActual ? styles.inputError : ""}
                            />
                            <button type="button" className={styles.togglePass} onClick={() => toggle("actual")}>
                                {mostrar.actual ? "🛡️" : "👁️"}
                            </button>
                        </div>
                        {errores.contrasenaActual && <span className={styles.error}>{errores.contrasenaActual}</span>}
                    </div>

                    {/* Nueva contraseña */}
                    <div className={styles.campo}>
                        <label>Nueva contraseña</label>
                        <div className={styles.passWrapper}>
                            <input
                                name="contrasenaNueva"
                                type={mostrar.nueva ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Mínimo 6 caracteres"
                                value={form.contrasenaNueva}
                                onChange={handleChange}
                                className={errores.contrasenaNueva ? styles.inputError : ""}
                            />
                            <button type="button" className={styles.togglePass} onClick={() => toggle("nueva")}>
                                {mostrar.nueva ? "🛡️" : "👁️"}
                            </button>
                        </div>
                        {errores.contrasenaNueva && <span className={styles.error}>{errores.contrasenaNueva}</span>}

                        {/* Indicador de fortaleza */}
                        {form.contrasenaNueva.length > 0 && (
                            <div className={styles.fortaleza}>
                                <div className={styles.barrasFortaleza}>
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className={`${styles.barraF} ${
                                            form.contrasenaNueva.length >= n * 4 ? styles.barraFActiva : ""
                                        }`} />
                                    ))}
                                </div>
                                <span className={styles.fortalezaLabel}>
                                    {form.contrasenaNueva.length < 4 ? "Débil" :
                                     form.contrasenaNueva.length < 8 ? "Media" : "Fuerte"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Repetir contraseña */}
                    <div className={styles.campo}>
                        <label>Repetir nueva contraseña</label>
                        <div className={styles.passWrapper}>
                            <input
                                name="repetirContrasena"
                                type={mostrar.repetir ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Repita la nueva contraseña"
                                value={form.repetirContrasena}
                                onChange={handleChange}
                                className={errores.repetirContrasena ? styles.inputError : ""}
                            />
                            <button type="button" className={styles.togglePass} onClick={() => toggle("repetir")}>
                                {mostrar.repetir ? "🛡️" : "👁️"}
                            </button>
                        </div>
                        {errores.repetirContrasena && <span className={styles.error}>{errores.repetirContrasena}</span>}

                        {/* Coincidencia en tiempo real */}
                        {form.repetirContrasena.length > 0 && !errores.repetirContrasena && (
                            <span className={`${styles.coincidencia} ${
                                form.contrasenaNueva === form.repetirContrasena
                                    ? styles.coincidenciaOk
                                    : styles.coincidenciaMal
                            }`}>
                                {form.contrasenaNueva === form.repetirContrasena ? "✔ Las contraseñas coinciden" : "✖ No coinciden aún"}
                            </span>
                        )}
                    </div>

                    <button
                        className={styles.btnConfirmar}
                        onClick={handleConfirmar}
                        disabled={cargando}
                    >
                        {cargando ? "Guardando..." : "Confirmar cambios"}
                    </button>
                </div>
            </main>

            {/* Card flotante de éxito */}
            <div className={`${styles.toast} ${guardado ? styles.toastVisible : ""}`}>
                <span className={styles.toastIcono}>✔</span>
                <div>
                    <strong>Credenciales actualizadas</strong>
                    <p>Se guardaron las nuevas credenciales correctamente.</p>
                </div>
            </div>
        </div>
    );
}

export default Credenciales;