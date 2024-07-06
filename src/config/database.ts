import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";
import { Movie } from "../models/Movie.models";
import { Streaming } from "../models/streaming.model";
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "postgrs",
  models: [User, Session, Movie, Streaming],
});

export default sequelize