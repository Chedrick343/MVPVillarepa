import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import styles from './App.module.css'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <div className={styles.body}>
      <div className={styles.headBar}>
        <Header />
      </div>
      <div className ={styles.principalContainer}>

      </div>
    </div>
  )
}

export default App
