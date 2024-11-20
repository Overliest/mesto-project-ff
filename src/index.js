import './pages/index.css'
import './images/avatar.jpg'
import { 
  closePopup,
  openPopup
} from './features/modal'
import { 
  createCard,
  removeCard,
  makeCardFavorite
} from './features/cards'
import { 
  enableValidation,
  clearValidation
} from './features/validation.js'
import {
  getInitialCards, 
  getUser, 
  editProfile, 
  addCard, 
  deleteCard, 
  updateAvatar 
} from './features/api.js'

// DOM узлы
const placesList = document.querySelector('.places__list')
const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupImage = document.querySelector('.popup_type_image')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')
const closeButtons = document.querySelectorAll('.popup__close')
const editProfileForm = document.forms['edit-profile']
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name')
const profileJobInput = editProfileForm.querySelector('.popup__input_type_description')
const profileImage = document.querySelector('.profile__image')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newCardForm = document.forms['new-place']
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name')
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url')
const imageInPopup = popupImage.querySelector('.popup__image')
const captionInPopup = popupImage.querySelector('.popup__caption')
const avatarForm = document.forms['change-avatar']
const avatarOverlay = document.querySelector('.profile__image-overlay')
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarInput = document.querySelector('#avatar-url')
const confirmPopup = document.querySelector('.popup_type_confirm')
const confirmForm = confirmPopup.querySelector('.popup__form')

let cardToDelete
let profileId

const getUserInfo = async () => {
  const user = await getUser()

  profileNameInput.textContent = user.name
  profileJobInput.textContent = user.about
  profileImage.src = user.avatar
  profileId = user._id
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

const showDeleteConfirmation = (cardElement, cardId) => {
  cardToDelete = { 
    id: cardId,
    element: cardElement 
  }

  openPopup(confirmPopup)
}

const handleCardDelete = async (event, cardId) => {
  const cardElement = event.target.closest('.card')
  
  showDeleteConfirmation(cardElement, cardId)
}

const handleImageClick = (event) => {
  imageInPopup.src = event.target.src
  imageInPopup.alt = event.target.alt
  captionInPopup.textContent = event.target.alt
  openPopup(popupImage)
}

const handleSubmitProfileForm = async (event) => {
  event.preventDefault()

  const submitButton = event.submitter
  const initialButtonText = submitButton.textContent
  
  try {
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true

    const user = await editProfile({
      name: profileNameInput.value,
      about: profileJobInput.value
    })

    profileTitle.textContent = user.name
    profileDescription.textContent = user.about

    closePopup(popupEditProfile)
  } catch (err) {
      console.error('Ошибка при обновлении профиля:', err);
  } finally {
    submitButton.textContent = initialButtonText
    submitButton.disabled = false
  }
}

const handleSubmitNewCardForm = async (event) => {
  event.preventDefault()

  const submitButton = event.submitter
  const initialButtonText = submitButton.textContent

  try {
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true

    const cardData = await addCard({
      name: cardNameInput.value,
      link: cardLinkInput.value
    })

    const newCard = createCard(cardData, handleCardDelete, makeCardFavorite, handleImageClick, profileId)

    placesList.insertAdjacentElement('afterbegin', newCard)
    closePopup(popupNewCard)
    newCardForm.reset()
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.textContent = initialButtonText
    submitButton.disabled = false
  }
}

const handleUpdateAvatar = async (event) => {
  event.preventDefault()

  const submitButton = event.submitter
  const initialButtonText = submitButton.textContent

  try {
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true

    const data = await updateAvatar(avatarInput.value)
    
    profileImage.src = data.avatar

    closePopup(avatarPopup)
    avatarForm.reset()
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.textContent = initialButtonText
    submitButton.disabled = false
  }
}

const handleConfirmToDelete = async (event) => {
  event.preventDefault()

  const submitButton = event.submitter
  const initialButtonText = submitButton.textContent
  try {
    submitButton.textContent = 'Удаление...'
    submitButton.disabled = true

    await deleteCard(cardToDelete.id)
    removeCard(cardToDelete.element)

    closePopup(confirmPopup)
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.textContent = initialButtonText
    submitButton.disabled = false
    cardToDelete = null
  }
}

/* Listeners */
avatarOverlay.addEventListener('click', () => {
  openPopup(avatarPopup)
  clearValidation(avatarPopup)
})
addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard)
  clearValidation(popupNewCard)
})
editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent
  profileJobInput.value = profileDescription.textContent

  openPopup(popupEditProfile)
  clearValidation(popupEditProfile)
})
closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})
editProfileForm.addEventListener('submit', handleSubmitProfileForm)
newCardForm.addEventListener('submit', handleSubmitNewCardForm)
avatarForm.addEventListener('submit', handleUpdateAvatar)
confirmForm.addEventListener('submit', handleConfirmToDelete)


/* Начальное заполнение карточек */
const initialCardsLoading = async () => {
  try {
    await getUserInfo()
    const cards = await getInitialCards()

    cards.forEach(cardData => {
      const cardElement = createCard(cardData, handleCardDelete, makeCardFavorite, handleImageClick, profileId)
      placesList.append(cardElement)
    })
  } catch (err) {
    console.error(err)
  }
}

initialCardsLoading()
enableValidation()