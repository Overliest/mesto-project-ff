import './pages/index.css'
import './images/avatar.jpg'
import { 
  closePopup,
  openPopup
} from './features/modal'
import { 
  createCard,
  deleteCard,
  makeCardFavorite
} from './features/cards'
import { initialCards } from './features/initialCards'

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
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const newCardForm = document.forms['new-place']
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name')
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url')
const imageInPopup = popupImage.querySelector('.popup__image')
const captionInPopup = popupImage.querySelector('.popup__caption')

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

const handleImageClick = (event) => {
  imageInPopup.src = event.target.src
  imageInPopup.alt = event.target.alt
  captionInPopup.textContent = event.target.alt
  openPopup(popupImage)
}

const handleSubmitProfileForm = (event) => {
  event.preventDefault()

  profileTitle.textContent = profileNameInput.value
  profileDescription.textContent = profileJobInput.value

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleSubmitProfileForm)

editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent
  profileJobInput.value = profileDescription.textContent

  openPopup(popupEditProfile)
})

const handleSubmitNewCardForm = (event) => {
  event.preventDefault()

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  const newCard = createCard(cardData, deleteCard, makeCardFavorite, handleImageClick)
  placesList.insertAdjacentElement('afterbegin', newCard)

  closePopup(popupNewCard)

  newCardForm.reset()
}

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard)
})

newCardForm.addEventListener('submit', handleSubmitNewCardForm)

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, makeCardFavorite, handleImageClick)
  placesList.append(cardElement)
})