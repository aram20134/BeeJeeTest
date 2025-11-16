import { useTasksStore } from "../../store/useTasksStore"
import styles from './Pagination.module.scss'

export default function Pagination() {
  const { page, perPage, totalPages, totalItems, setPage } = useTasksStore()

  return (
    <div className={styles.container}>
      <p className={styles.perPage}>Строк на странице: {perPage}</p>
      <p className={styles.perPage}>Всего записей: {totalItems}</p>

      <ul>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={pageNumber === page ? styles.active : ""}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}