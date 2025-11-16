import { Outlet, Link } from "react-router"
import styles from './Layout.module.scss'
import { useAuthStore } from "../../../store/useAuthStore"

export default function Layout() {
  const { userData, logOut } = useAuthStore()

  return (
    <div className={styles.container}>
      <header>
        <Link to="/">Задачи</Link>
        <nav>
          {userData ? (
            <button onClick={() => logOut()}>Выйти</button>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </nav>
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
    </div>
  )
}
