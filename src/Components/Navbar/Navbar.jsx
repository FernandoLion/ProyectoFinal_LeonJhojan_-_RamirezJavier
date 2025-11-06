
import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.container}>
            <a href="/" className={styles.logo}>
                Mi CMS de Noticias
            </a>
        </nav>
    )

}

export default Navbar