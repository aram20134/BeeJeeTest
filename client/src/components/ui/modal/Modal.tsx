import { useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.scss"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: any
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {children}
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </div>,
    document.body
  )
}
