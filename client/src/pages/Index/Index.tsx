import Input from "../../components/ui/inputs/input/Input"
import TasksList from "../../components/tasksList/TasksList"
import { useTasksStore } from "../../store/useTasksStore"
import styles from './Index.module.scss'
import debounce from "../../utils/debounce"
import Modal from "../../components/ui/modal/Modal"
import Alert from "../../components/ui/alert/Alert"
import { AlertType } from "../../components/ui/alert/types"

export default function Index() {
  const {
    setFilter,
    setCreateModalOpen,
    createModalOpen,
    closeCreateModal,
    setName,
    setText,
    setEmail,
    createTask,
    createSuccess
  } = useTasksStore()

  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createTask()
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Input onChange={debounce((val: any) => setFilter({ q: val }), 500)} />
        <button onClick={() => setCreateModalOpen()}>Создать задачу</button>
      </div>
      <TasksList />
      <Modal isOpen={createModalOpen} onClose={closeCreateModal}>
        <h3>Созданиe задачи</h3>
        <form onSubmit={onSubmitHandle} className={styles.createContainer}>
          <Input onChange={setName} placeholder="Имя" required />
          <Input type="email" onChange={setEmail} placeholder="Email" required />
          <Input onChange={setText} placeholder="Текст" required />
          <div className={styles.actions}>
            <button type="submit">Сохранить</button>
            <button onClick={() => closeCreateModal()}>Отменить</button>
          </div>
          {createSuccess && <Alert message="Задача успешно создана" type={AlertType.SUCCESS} />}
        </form>
      </Modal>
    </div>
  )
}