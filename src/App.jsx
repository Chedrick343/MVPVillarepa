import { useState } from "react";
import styles from "./App.module.css";
import Header from "./Header";
import Contenido from "./Contenido";

function App() {
  const [seccion, setSeccion] = useState("inicio");

  return (
    <div className={styles.app}>
      <Header seccionActiva={seccion} onNavegar={setSeccion} />
      <main className={styles.main}>
        <Contenido seccionActiva={seccion} />
      </main>
    </div>
  );
}

export default App;