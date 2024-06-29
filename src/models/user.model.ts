import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "user",
  freezeTableName: true,  
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true
  })
  user_id: String;

  @Column({
    type: DataType.TEXT,
  })
  name: String;

  @Column({
    type: DataType.TEXT,
  })
  username: String;

  @Column({
    type: DataType.TEXT,
  })
  email: String;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
  })
  phone: String;

  @Column({
    type: DataType.TEXT,
  })
  cpf: String;

  @Column({
    type: DataType.DATE,
  })
  birthdate: Date;
}
