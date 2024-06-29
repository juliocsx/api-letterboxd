import express  from 'express';
import sequelize from './config/database';
import router from './routers';
import cors from 'cors'

const app = express();

app.listen(5000);
app.use(express.json());

app.use('/api', router) // localhost:3000/api

app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
)

sequelize.sync().then(()=> {
    console.log("conexão estabelecida com sucesso");
}).catch((error) =>{
    console.log(`Erro de conexão ${error}`);
})