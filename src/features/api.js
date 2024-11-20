const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: "7d15b5cd-9110-4373-9a0f-39339760a772",
    'Content-Type': 'application/json'
  }
}

async function getData(url, methodName = 'GET', body = null) {
  const res = await fetch(url, {
    method: methodName,
    headers: apiConfig.headers,
    body: body
  })
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error(`Ошибка: ${res.status}`)
  }
}

export async function getInitialCards() {
  return await getData(`${apiConfig.baseUrl}/cards`)
}

export async function getUser() {
  return await getData(`${apiConfig.baseUrl}/users/me`)
}

export async function editProfile(data) {
  return await getData(`${apiConfig.baseUrl}/users/me`, 'PATCH', JSON.stringify({
    name: data.name,
    about: data.about
  }))
}

export async function addCard(data) {
  return await getData(`${apiConfig.baseUrl}/cards`, 'POST', JSON.stringify({
    name: data.name,
    link: data.link
  }))
}

export async function deleteCard(cardId) {
  return await getData(`${apiConfig.baseUrl}/cards/${cardId}`, 'DELETE')
}

export async function addLike(cardId) {
  return await getData(`${apiConfig.baseUrl}/cards/likes/${cardId}`, 'PUT')
}

export async function removeLike(cardId) {
  return await getData(`${apiConfig.baseUrl}/cards/likes/${cardId}`, 'DELETE')
}

export async function updateAvatar(avatarUrl) {
  return await getData(`${apiConfig.baseUrl}/users/me/avatar`, 'PATCH', JSON.stringify({
    avatar: avatarUrl
  }))
}