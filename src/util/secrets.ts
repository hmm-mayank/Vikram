import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
export const IMAGE_URI = prod ? process.env["UPLOAD_PATH"] : process.env["UPLOAD_PATH_LOCAL"];
export const SERVER_IP = prod ? process.env["SERVER_IP"] : process.env["SERVER_IP_LOCAL"];
export const MESSAGE_SID = prod ? process.env["MESSAGE_SID"] : process.env["MESSAGE_SID"];
export const MESSAGE_AUTH = prod ? process.env["MESSAGE_AUTH_TOKEN"] : process.env["MESSAGE_AUTH_TOKEN"];
export const MESSAGE_NUMBER = prod ? process.env["MESSAGE_NUMBER"] : process.env["MESSAGE_NUMBER"];

export const NOT_FOUND_IMAGE = process.env["NOT_FOUND_IMAGE"];
if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MONGODB_URI) {
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
