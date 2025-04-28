export const BASEURL =
  process.env.NODE_ENV === "production"
    ? "https://api.caption-crafter.crabdance.com"
    : "http://localhost:3001";
