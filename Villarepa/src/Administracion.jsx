import { useState } from "react";
import styles from "./Administracion.module.css";
import Dashboard from "./Dashboard";
import Solicitudes from "./Solicitudes";
import Factura from "./Factura";
import Credenciales from "./Credenciales";

function Administracion() {
    const [form, setForm] = useState({ usuario: "", contrasena: "" });
    const [mostrarPass, setMostrarPass] = useState(false);
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [vista, setVista] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const validar = () => {
        const e = {};
        if (!form.usuario.trim()) e.usuario = "Ingrese su usuario.";
        if (!form.contrasena) e.contrasena = "Ingrese su contraseña.";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validar();
        if (Object.keys(errs).length > 0) { setErrores(errs); return; }
        setCargando(true);
        setTimeout(() => { setCargando(false); setVista("dashboard"); }, 900);
    };

    const handleSalir = () => {
        setVista(null);
        setForm({ usuario: "", contrasena: "" });
    };

    if (vista === "dashboard")   return <Dashboard   onNavegar={setVista} onSalir={handleSalir} />;
    if (vista === "solicitudes") return <Solicitudes onNavegar={setVista} onSalir={handleSalir} />;
    if (vista === "facturas")    return <Factura       onNavegar={setVista} onSalir={handleSalir} />;
    if (vista === "credenciales") return <Credenciales onNavegar={setVista} onSalir={handleSalir} />;

    return (
        <section className={styles.seccion}>
            <div className={styles.encabezado}>
                <h2>Panel de <span>Administración</span></h2>
                <p>Por ahora puedes poner cualquier valor, esto es solo una demostración.</p>
            </div>
            <form className={styles.formulario} onSubmit={handleSubmit} noValidate>
                <div className={styles.iconoLock}>🔒</div>

                <div className={styles.campo}>
                    <label htmlFor="usuario">Usuario</label>
                    <input id="usuario" name="usuario" type="text"
                        autoComplete="username" placeholder="Ingrese su usuario"
                        value={form.usuario} onChange={handleChange}
                        className={errores.usuario ? styles.inputError : ""} />
                    {errores.usuario && <span className={styles.error}>{errores.usuario}</span>}
                </div>

                <div className={styles.campo}>
                    <label htmlFor="contrasena">Contraseña</label>
                    <div className={styles.passWrapper}>
                        <input id="contrasena" name="contrasena"
                            type={mostrarPass ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Ingrese su contraseña"
                            value={form.contrasena} onChange={handleChange}
                            className={errores.contrasena ? styles.inputError : ""} />
                        <button type="button" className={styles.togglePass}
                            onClick={() => setMostrarPass((v) => !v)} tabIndex={-1}>
                            {mostrarPass ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {errores.contrasena && <span className={styles.error}>{errores.contrasena}</span>}
                </div>

                <button type="submit" className={styles.btnIngresar} disabled={cargando}>
                    {cargando ? "Verificando..." : "Iniciar sesión"}
                </button>
            </form>
        </section>
    );
}

export default Administracion;