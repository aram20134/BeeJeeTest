import clsx from 'clsx'
import styles from './Alert.module.scss'
import { AlertType } from './types'

type Props = {
  message: string
  type?: AlertType
}

export default function Alert({ message, type = AlertType.ERROR }: Props) {

  return (
    <div className={clsx(styles.container, styles[type])}>
      <h3>{message}</h3>
    </div>
  )
}