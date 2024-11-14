export const handleEscapeKey = (popup) => {
  return (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      closePopup(popup)
    }
  }
}

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleEscapeKey(popup))
  popup.addEventListener('mousedown', handleOverlayClick);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscapeKey(popup))
  popup.removeEventListener('mousedown', handleOverlayClick);
}