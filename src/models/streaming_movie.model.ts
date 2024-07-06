import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
  } 
  from "sequelize-typescript";
import { Streaming } from "./streaming.model";
import { Movie } from "./Movie.models";

@Table({
 tableName: "streaming_movie",
 freezeTableName: true,
})
export class Streaming_movie extends Model{
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true,
    })
    streamingMovie_id: String;

    @Column({
        type: DataType.UUID,
        references: {model: Streaming, key: "stream_id"},
    })
    stream_id:Number;

    @Column({
        type: DataType.UUID,
        references: {model: Movie, key: "movie_id"},
    })
    movie_id:Number;
}