import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_KEY: process.env.AWS_KEY,
  AWS_PRIVATE_KEY: process.env.AWS_PRIVATE_KEY,
};
