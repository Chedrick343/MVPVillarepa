import styles from './Contenido.module.css';
import Informacion from './Informacion';
import Servicios from './Servicios';
import Formulario from './Formulario';
import Contacto from './Contacto';

const secciones = {
    inicio:     <Informacion />,
    servicios:  <Servicios />,
    contacto:   <Contacto />,
    formulario: <Formulario />,
};

function Contenido({ seccionActiva }) {
    return (
        <div className={styles.contenido}>
            {secciones[seccionActiva] ?? <Informacion />}
        </div>
    );
}

export default Contenido;