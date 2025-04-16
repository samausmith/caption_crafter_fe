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

export { getCaptions, addCaption };
