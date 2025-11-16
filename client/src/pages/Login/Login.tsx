import Alert from "../../components/ui/alert/Alert";
import Input from "../../components/ui/inputs/input/Input";
import { useAuthStore } from "../../store/useAuthStore";
import styles from './Login.module.scss'

export default function Login() {
  const { login, password, setLogin, setPassword, submit, loading, error } = useAuthStore()

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <div className={styles.container}>
      <h1>Вход</h1>
      <form onSubmit={onSubmitHandle} className={styles.form}>
        <Input value={login} onChange={(val) => setLogin(val)} type="text" placeholder="Логин" />
        <Input value={password} onChange={(val) => setPassword(val)} type="password" placeholder="Пароль" />
        <button disabled={loading} type="submit">Войти</button>
      </form>
      {error && <Alert message={error} />}
    </div>
  )
}