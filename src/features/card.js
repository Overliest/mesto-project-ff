import { removeLike, addLike } from './api'

const cardTemplate = document.querySelector('#card-template').content

const updateLikesCounter = (likeButton, likes) => {
  const likeCounter = likeButton.closest('.card__description').querySelector('.card__like-count')

  likeCounter.textContent = likes.length
}

const makeCardFavorite = async (event, cardId) => {
  const likeButton = event.target
  try {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      const card = await removeLike(cardId)

      likeButton.classList.remove('card__like-button_is-active')
      updateLikesCounter(likeButton, card.likes)
    } else {
      const card = await addLike(cardId)

      likeButton.classList.add('card__like-button_is-active')
      updateLikesCounter(likeButton, card.likes)
    }
  } catch (err) {
    console.error(err)
  }
}

const createCard = (data, handleDelete, handleLikeCard, handleImageClick, profileId) => {
  const isLiked = data.likes.some((item) => item._id === profileId)

  const cardElement = cardTemplate.cloneNode(true).querySelector('.card')
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const deleteButton = cardElement.querySelector('.card__delete-button')
  const likeButton = cardElement.querySelector('.card__like-button')
  const likeCounter = cardElement.querySelector('.card__like-count')

  cardImage.src = data.link
  cardImage.alt = data.name
  cardTitle.textContent = data.name
  likeCounter.textContent = data.likes.length

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active')
  }

  if (data.owner._id !== profileId) {
    deleteButton.classList.add("card__delete-button-inactive")
  } else {
    deleteButton.addEventListener('click', (event) => (handleDelete(event, data._id)))
  }

  likeButton.addEventListener('click', (event) => handleLikeCard(event, data._id))
  cardImage.addEventListener('click', handleImageClick)

  return cardElement
}

const removeCard = (cardElement) => {
  cardElement.remove()
}

export { createCard, removeCard, makeCardFavorite }