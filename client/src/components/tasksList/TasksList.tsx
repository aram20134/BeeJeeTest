import { useEffect } from 'react'
import { useTasksStore } from '../../store/useTasksStore'
import styles from './TasksList.module.scss'
import Pagination from '../pagination/Pagination'
import TableColumn from '../ui/TableColumn'
import Task from './Task'
import EditTask from './EditTask'
import type { Task as TaskType } from '../../api/tasks/tasks.types'

const columns = [
  { sortField: 'name', name: 'Имя' },
  { sortField: 'email', name: 'Email' },
  { sortField: 'text', name: 'Текст' },
  { sortField: 'isDone', name: 'Выполнено' }
]

export default function TasksList() {
  const { fetchTasks, isLoading, items: tasks, editTaskId } = useTasksStore()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const RenderTaskHandle = ({ task }: { task: TaskType }) => {
    const isEditingTask = task.id === editTaskId

    return isEditingTask ? <EditTask task={task} /> : <Task task={task} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.tasksHeader}>
        {columns.map((col) => <TableColumn key={col.name} {...col} />)}
      </div>
      {isLoading && !tasks.length && <p className={styles.loader}>Загружаем наши любимые задачи ❤️❤️❤️</p>}
      {!isLoading && tasks.length === 0 && <p>Нет задач</p>}
      {tasks.map((task, index) => (
        <RenderTaskHandle task={task} key={index} />
      ))}
      <Pagination />
    </div>
  )
}