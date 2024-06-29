import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "session",
  freezeTableName: true,
})
export class Session extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  session_id: String;

  @Column({
    type: DataType.STRING,
  })
  token: String;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  active: boolean;

  @Column({
    type: DataType.UUID,
    references: { model: User, key: "user_id" },
  })
  user_id: number;
}
