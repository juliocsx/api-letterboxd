import {
    Table,
    Column,
    Model,
    DataType, 
    PrimaryKey,
}

from "sequelize-typescript"; 

@Table({
    tableName: "streaming",
    freezeTableName: true,  
})

export class Streaming extends Model {
 
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true
    })
    streaming_id: String;
    @Column({
        type: DataType.TEXT
    })
    name: string;

    @Column({
        type: DataType.TEXT
    })
    company: string;
    @Column({
        type: DataType.TEXT   
    })
    url: string;
}