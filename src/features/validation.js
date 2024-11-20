const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`)

  input.classList.add(validationSelectors.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationSelectors.errorClass)
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`)

  input.classList.remove(validationSelectors.inputErrorClass)
  errorElement.classList.remove(validationSelectors.errorClass)
  errorElement.textContent = ''
}

function isValid(form, input) {
  input.validity.patternMismatch 
    ? input.setCustomValidity(input.dataset.errorMessage) 
    : input.setCustomValidity('')
  // if (input.validity.patternMismatch) {
  //   input.setCustomValidity(input.dataset.errorMessage)
  // } else {
  //   input.setCustomValidity('')
  // }

  input.validity.valid
    ? hideInputError(form, input)
    : showInputError(form, input, input.validationMessage)

  // if (!input.validity.valid) {
  //     showInputError(form, input, input.validationMessage)
  // } else {
  //     hideInputError(form, input)
  // }
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass)
  button.disabled = true
}

function toggleButton(inputList, buttonElement, inactiveButtonClass) {
  if (inputList.some((input) => !input.validity.valid)) {
    disableButton(buttonElement, inactiveButtonClass)
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.disabled = false
  }
}

function setEventListeners(form, selectors = validationSelectors) {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector))
  const buttonElement = form.querySelector(selectors.submitButtonSelector)

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input)
      toggleButton(inputList, buttonElement, selectors.inactiveButtonClass)
    })
  })
}

export function enableValidation(selectors = validationSelectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))

  formList.forEach((form) => setEventListeners(form, selectors))
}

export function clearValidation(form, selectors = validationSelectors) {
  const inputList = Array.from(form.querySelectorAll(validationSelectors.inputSelector))
  const buttonElement = form.querySelector(selectors.submitButtonSelector)

  inputList.forEach((input) => {
    hideInputError(form, input)
    input.setCustomValidity('')
  })

  disableButton(buttonElement, selectors.inactiveButtonClass)
}