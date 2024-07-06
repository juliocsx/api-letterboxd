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
    type: DataType.DATE,
    })
    release_date:Date ;

    @Column({
    type: DataType.STRING,
    })
    sinopse: String;

    @Column({
    type: DataType.INTEGER,
    })
    duration:Number;
  }

  
