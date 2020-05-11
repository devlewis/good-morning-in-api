module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: "*",
  COUNTRIES_API_TOKEN: process.env.COUNTRIES_API_TOKEN,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  API_BASE_URL: process.env.APP_API_BASE_URL || "http://localhost:3000/api",
  NODE_ENV: process.env.NODE_ENV || "development",
};
