import dotenv from "dotenv";

dotenv.config();

const APP_URL = process.env.APP_URL || "http://localhost";
const APP_PORT = process.env.APP_PORT || "8000";
const baseUrl = `${APP_URL}:${APP_PORT}`;
const appName = process.env.VITE_VENUE_NAME || "Roomdisplay";

export { appName, baseUrl };
