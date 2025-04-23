import { baseUrl } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject({ status: res.status, body: err });
  });
}

function getCaptions() {
  return fetch(`${baseUrl}/captions`).then(checkResponse);
}

function addCaptionAsUser({ caption, imageUrl }, token) {
  return fetch(`${baseUrl}/captions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      caption,
      imageUrl,
    }),
  }).then(checkResponse);
}

function addCaption({ caption, imageUrl }) {
  return fetch(`${baseUrl}/captions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      caption,
      imageUrl,
    }),
  }).then(checkResponse);
}

function deleteCaption(cardId, token) {
  return fetch(`${baseUrl}/captions/${cardId}`, {
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
  addCaptionAsUser,
  deleteCaption,
  addCardLike,
  removeCardLike,
  checkResponse,
};
