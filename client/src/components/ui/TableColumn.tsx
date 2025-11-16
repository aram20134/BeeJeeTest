import { useTasksStore } from "../../store/useTasksStore"
import SortArrow from "./sortArrow/SortArrow"

type Props = {
  sortField: string
  name: string
}

export default function TableColumn({ sortField, name }: Props) {
  const { setSort, sort, sortField: sortFieldStored } = useTasksStore()

  const onSort = (field: string) => setSort(field)

  return (
    <button onClick={() => onSort(sortField)}>
      {name}
      <SortArrow direction={sort} active={sortFieldStored === sortField} />
    </button>
  )
}