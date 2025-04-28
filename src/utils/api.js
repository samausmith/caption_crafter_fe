import { BASEURL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject({ status: res.status, body: err });
  });
}

function generateCaption(imageUrl) {
  return fetch(`${BASEURL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  }).then(checkResponse);
}

function getCaptions() {
  return fetch(`${BASEURL}/captions`).then(checkResponse);
}

function addCaptionAsUser({ caption, imageUrl }, token) {
  return fetch(`${BASEURL}/captions`, {
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
  return fetch(`${BASEURL}/captions`, {
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
  return fetch(`${BASEURL}/captions/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(id, token) {
  return fetch(`${BASEURL}/captions/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${BASEURL}/captions/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  generateCaption,
  getCaptions,
  addCaption,
  addCaptionAsUser,
  deleteCaption,
  addCardLike,
  removeCardLike,
  checkResponse,
};
