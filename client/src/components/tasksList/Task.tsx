import clsx from 'clsx'
import styles from './TasksList.module.scss'
import { useTasksStore } from '../../store/useTasksStore'
import BooleanField from '../ui/boolenField/BooleanField'
import type { Task } from '../../api/tasks/tasks.types'
import { useAuthStore } from '../../store/useAuthStore'

export default function Task({ task }: { task: Task }) {
  const { isLoading, setEditingTask } = useTasksStore()
  const { userData } = useAuthStore()

  return (
    <div className={clsx(styles.task, isLoading && styles.loading)}>
      <div className={styles.taskGrid}>
        <h3>{task.name}</h3>
        <p>{task.email}</p>
        <p>{task.text}</p>
        <p>
          <BooleanField boolean={task.isDone} />
        </p>
      </div>
      <div className={styles.actions}>
        {userData?.isAdmin && <button onClick={() => setEditingTask(task)}>Редактировать</button>}
        <p className={styles.editedByAdmin}>Отредактирован админом: <BooleanField boolean={task.isEditedByAdmin} /></p>
      </div>
    </div>
  )
}