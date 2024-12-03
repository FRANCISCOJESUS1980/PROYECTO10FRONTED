import { openBaseModal, closeBaseModal } from './BaseModal/BaseModal'

export const Modal = (content, modalId = '') => {
  return openBaseModal(content, modalId, () => closeBaseModal(modalId))
}

export const openModal = (content, modalId) => {
  Modal(content, modalId)
}

export const closeModal = (modalId) => {
  closeBaseModal(modalId)
}
