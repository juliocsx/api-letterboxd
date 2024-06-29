import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "postgres",
  models: [User, Session],
});

export default sequelize