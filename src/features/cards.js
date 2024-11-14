const cardTemplate = document.querySelector('#card-template').content

const makeCardFavorite = (event) => {
  event.target.classList.toggle('card__like-button_is-active')
}

const createCard = (data, handleDelete, handleLikeCard, handleImageClick) => {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card')
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const deleteButton = cardElement.querySelector('.card__delete-button')
  const likeButton = cardElement.querySelector('.card__like-button')

  cardImage.src = data.link
  cardImage.alt = data.name
  cardTitle.textContent = data.name

  deleteButton.addEventListener('click', () => {
      handleDelete(cardElement)
  });

  likeButton.addEventListener('click', handleLikeCard)
  cardImage.addEventListener('click', handleImageClick)

  return cardElement
}

const deleteCard = (cardElement) => {
  cardElement.remove()
}

export { createCard, deleteCard, makeCardFavorite }