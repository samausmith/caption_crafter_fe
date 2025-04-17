import { baseUrl } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

function getCaptions() {
  return fetch(`${baseUrl}/captions`).then(checkResponse);
}

function addCaption({ caption, imageUrl }, token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}/captions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      caption,
      imageUrl,
    }),
  }).then(checkResponse);
}

function deleteCaption(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/captions/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/captions/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  getCaptions,
  addCaption,
  deleteCaption,
  addCardLike,
  removeCardLike,
  checkResponse,
};
