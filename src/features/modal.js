function handleEscape(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup)
  }
}

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleEscape)
  popup.addEventListener('mousedown', handleOverlayClick);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscape)
  popup.removeEventListener('mousedown', handleOverlayClick);
}