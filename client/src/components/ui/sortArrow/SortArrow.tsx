
type Props = {
  active: boolean
  direction: "asc" | "desc"
}

export default function SortArrow({ active, direction }: Props) {

  if (!active) {
    return null
  }

  return direction === "asc" ? "▲" : "▼"
}