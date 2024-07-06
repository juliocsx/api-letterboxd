import { table } from "console";
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
  } from "sequelize-typescript";

  @Table({
    tableName: "movie",
    freezeTableName: true,
  })
  export class Movie extends Model{
    @PrimaryKey
    @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    })
    movie_id: String;

    @Column({
    type: DataType.TEXT,
    })
    name:String;

    @Column({
    type: DataType.TEXT,
    })
    director:String;
    
    @Column({
    type: DataType.TEXT,
    })
    rating: Number;

    @Column({
    type: DataType.STRING,
    })
    sinopse: String;

    @Column({
    type: DataType.NUMBER,
    })
    duration:Number;
  }

  
