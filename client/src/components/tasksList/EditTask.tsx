import clsx from 'clsx'
import styles from './TasksList.module.scss'
import { useTasksStore } from '../../store/useTasksStore'
import Input from '../ui/inputs/input/Input'
import type { Task } from '../../api/tasks/tasks.types'
import Alert from '../ui/alert/Alert'

export default function EditTask({ task }: { task: Task }) {
  const {
    isLoading,
    setText,
    updateTask,
    setIsDone,
    cancelEditingTask,
    error
  } = useTasksStore()

  const OnSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTask()
  }

  return (
    <div className={clsx(styles.task, isLoading && styles.loading)}>
      <form id='taskEdit' onSubmit={OnSubmitHandle} className={styles.taskGrid}>
        <h3>{task.name}</h3>
        <p>{task.email}</p>
        <Input onChange={(value) => setText(value)} placeholder='Текст задачи' defaultValue={task.text} />
        <Input onChange={setIsDone} type="checkbox" defaultChecked={task.isDone} />
      </form>
      <div className={styles.actions}>
        <button form='taskEdit' type='submit'>Сохранить</button>
        <button onClick={() => cancelEditingTask()}>Отменить</button>
      </div>
      {error && <Alert message={error} />}
    </div>
  )
}