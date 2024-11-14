import { initialCards } from './cards'
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// DOM узлы
const placesList = document.querySelector('.places__list')

// Функция создания карточки
const createCard = (data, handleDelete) => {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card')
  
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardImage.src = data.link
  cardImage.alt = data.name
  cardTitle.textContent = data.name

  deleteButton.addEventListener('click', () => {
      handleDelete(cardElement)
  });

  return cardElement
}

// Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove()
}

// Вывести карточки на страницу
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard)
  placesList.append(cardElement)
})