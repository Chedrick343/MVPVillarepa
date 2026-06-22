import { useState } from "react";
import styles from "./Formulario.module.css";

const horarios = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
    "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM",
];

const servicios = [
    { value: "vagoneta",    label: "🚛  Vagoneta" },
    { value: "excavadora",  label: "🏗️  Excavadora" },
    { value: "montacargas", label: "🔧  Montacargas" },
    { value: "aplanadora",  label: "🛣️  Aplanadora" },
    { value: "grua",        label: "🏛️  Grúa" },
];

function Formulario() {
    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        celular: "",
        servicio: "",
        fecha: "",
        horario: "",
    });

    const [enviado, setEnviado] = useState(false);
    const [errores, setErrores] = useState({});

    const validar = () => {
        const e = {};
        if (!form.nombre.trim()) e.nombre = "Ingrese su nombre.";
        if (!form.apellidos.trim()) e.apellidos = "Ingrese sus apellidos.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
            e.correo = "Ingrese un correo válido.";
        if (!/^\d{8,15}$/.test(form.celular.replace(/\s|-/g, "")))
            e.celular = "Ingrese un número válido (8 dígitos).";
        if (!form.servicio) e.servicio = "Seleccione un servicio.";
        if (!form.fecha) e.fecha = "Seleccione una fecha.";
        if (!form.horario) e.horario = "Seleccione un horario.";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = () => {
        const e = validar();
        if (Object.keys(e).length > 0) {
            setErrores(e);
            return;
        }
        setEnviado(true);
    };

    const handleReset = () => {
        setForm({ nombre: "", apellidos: "", correo: "", celular: "", servicio: "", fecha: "", horario: "" });
        setErrores({});
        setEnviado(false);
    };

    const hoy = new Date().toISOString().split("T")[0];

    const servicioLabel = servicios.find((s) => s.value === form.servicio)?.label ?? "";

    if (enviado) {
        return (
            <section className={styles.seccion}>
                <div className={styles.exito}>
                    <span className={styles.exitoIcono}>✔</span>
                    <h3>¡Solicitud enviada!</h3>
                    <p>
                        Nos pondremos en contacto con{" "}
                        <strong>{form.nombre} {form.apellidos}</strong> a la
                        brevedad posible.
                    </p>
                    <p className={styles.exitoServicio}>{servicioLabel}</p>
                    <p className={styles.exitoDetalle}>
                        📅 {form.fecha} &nbsp;·&nbsp; 🕐 {form.horario}
                    </p>
                    <button className={styles.btnReset} onClick={handleReset}>
                        Enviar otra solicitud
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.seccion}>
            <div className={styles.encabezado}>
                <h2>
                    Solicite su <span>servicio</span>
                </h2>
                <p>
                    Complete el formulario y nos comunicaremos para confirmar su
                    reserva.
                </p>
            </div>

            <div className={styles.formulario}>
                {/* Fila: Nombre + Apellidos */}
                <div className={styles.fila}>
                    <div className={styles.campo}>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ej. Juan"
                            value={form.nombre}
                            onChange={handleChange}
                            className={errores.nombre ? styles.inputError : ""}
                        />
                        {errores.nombre && (
                            <span className={styles.error}>{errores.nombre}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            id="apellidos"
                            name="apellidos"
                            type="text"
                            placeholder="Ej. Pérez Mora"
                            value={form.apellidos}
                            onChange={handleChange}
                            className={errores.apellidos ? styles.inputError : ""}
                        />
                        {errores.apellidos && (
                            <span className={styles.error}>{errores.apellidos}</span>
                        )}
                    </div>
                </div>

                {/* Fila: Correo + Celular */}
                <div className={styles.fila}>
                    <div className={styles.campo}>
                        <label htmlFor="correo">Correo electrónico</label>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={form.correo}
                            onChange={handleChange}
                            className={errores.correo ? styles.inputError : ""}
                        />
                        {errores.correo && (
                            <span className={styles.error}>{errores.correo}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="celular">Número de celular</label>
                        <input
                            id="celular"
                            name="celular"
                            type="tel"
                            placeholder="Ej. 8888-8888"
                            value={form.celular}
                            onChange={handleChange}
                            className={errores.celular ? styles.inputError : ""}
                        />
                        {errores.celular && (
                            <span className={styles.error}>{errores.celular}</span>
                        )}
                    </div>
                </div>

                {/* Fila: Servicio (ancho completo) */}
                <div className={styles.filaCompleta}>
                    <div className={styles.campo}>
                        <label htmlFor="servicio">Servicio requerido</label>
                        <select
                            id="servicio"
                            name="servicio"
                            value={form.servicio}
                            onChange={handleChange}
                            className={errores.servicio ? styles.inputError : ""}
                        >
                            <option value="">Seleccione un servicio</option>
                            {servicios.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                        {errores.servicio && (
                            <span className={styles.error}>{errores.servicio}</span>
                        )}
                    </div>
                </div>

                {/* Fila: Fecha + Horario */}
                <div className={styles.fila}>
                    <div className={styles.campo}>
                        <label htmlFor="fecha">Fecha del servicio</label>
                        <input
                            id="fecha"
                            name="fecha"
                            type="date"
                            min={hoy}
                            value={form.fecha}
                            onChange={handleChange}
                            className={errores.fecha ? styles.inputError : ""}
                        />
                        {errores.fecha && (
                            <span className={styles.error}>{errores.fecha}</span>
                        )}
                    </div>

                    <div className={styles.campo}>
                        <label htmlFor="horario">Horario requerido</label>
                        <select
                            id="horario"
                            name="horario"
                            value={form.horario}
                            onChange={handleChange}
                            className={errores.horario ? styles.inputError : ""}
                        >
                            <option value="">Seleccione una hora</option>
                            {horarios.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                        {errores.horario && (
                            <span className={styles.error}>{errores.horario}</span>
                        )}
                    </div>
                </div>

                {/* Botón enviar */}
                <div className={styles.accion}>
                    <button className={styles.btnEnviar} onClick={handleSubmit}>
                        Enviar solicitud
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Formulario;