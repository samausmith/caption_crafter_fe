export const BASEURL =
  process.env.NODE_ENV === "production"
    ? "https://api.caption-crafter.uk"
    : "http://localhost:3001";
