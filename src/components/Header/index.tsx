import { useTheme } from '../../contexts/ThemeContext'

import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    const { isDark, changeToDark, changeToLight } = useTheme()

    return (
        <header 
        className={isDark ? `${styles.headerContainer} ${styles.dark}` : styles.headerContainer}
        >
            <img src="/logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir, sempre</p>

            { isDark ? (
                <img 
                    className={styles.theme} 
                    src="/light.svg" 
                    alt="Light Mode"
                    onClick={changeToLight}
                />
            ) : (
                <img 
                    className={styles.theme} 
                    src="/dark.svg" 
                    alt="Light Mode"
                    onClick={changeToDark}
                />
            ) }

            <span>{currentDate}</span>
        </header>
    )
}