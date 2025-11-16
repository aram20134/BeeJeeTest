import styles from './Input.module.scss'

type Props = {
  onChange: (val: string) => void
  placeholder?: string
  type?: string
  value?: string
  defaultValue?: string
  defaultChecked?: boolean
  required?: boolean
}

export default function Input({
  onChange,
  placeholder = 'Поиск',
  type = 'text',
  value,
  defaultValue,
  defaultChecked,
  required = false
}: Props) {

  return (
    <input
      placeholder={placeholder}
      className={styles.input}
      type={type}
      value={value}
      required={required}
      defaultValue={defaultValue}
      defaultChecked={defaultChecked ?? false}
      onChange={(e: any) => onChange(type === 'checkbox' ? e.target.checked : e.target.value)}
    />
  )
} 