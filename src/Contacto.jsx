import styles from "./Contacto.module.css";

const contactos = [
    {
        id: "facebook",
        icono: "",
        red: "Facebook",
        valor: "/VillarepaCR",
        href: "https://facebook.com/VillarepaCR",
    },
    {
        id: "whatsapp",
        icono: "",
        red: "WhatsApp",
        valor: "+506 8888-8888",
        href: "https://wa.me/50688888888",
    },
    {
        id: "instagram",
        icono: "",
        red: "Instagram",
        valor: "@villarepa_cr",
        href: "https://instagram.com/villarepa_cr",
    },
    {
        id: "telefono",
        icono: "",
        red: "Teléfono",
        valor: "+506 2222-2222",
        href: "tel:+50622222222",
    },
];

function Contacto() {
    return (
        <section className={styles.seccion}>
            <div className={styles.encabezado}>
                <h2>
                    Contáctenos
                </h2>
                <p>
                    Puede contactarnos por los siguientes medios y redes sociales.
                    Estamos disponibles para atender cualquier consulta sobre
                    nuestros servicios.
                </p>
            </div>

            <div className={styles.tarjetas}>
                {contactos.map((c) => (
                    <a
                        key={c.id}
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.tarjeta}
                    >
                        <span className={styles.icono}>{c.icono}</span>
                        <div className={styles.info}>
                            <span className={styles.red}>{c.red}</span>
                            <span className={styles.valor}>{c.valor}</span>
                        </div>
                        <span className={styles.flecha}>↗</span>
                    </a>
                ))}
            </div>

            <div className={styles.nota}>
                <span>🕐</span>
                <p>Horario de atención: Lunes a Sábado de 7:00 AM a 5:00 PM</p>
            </div>
        </section>
    );
}

export default Contacto;