import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import connectDatabase from './coniguration/dbConfig'
import userRouter from './routers/userRoute';
import courseRouter from './routers/courseRoute';
import assignmentRouter from './routers/assignmentRoute';
import forumRouter from './routers/fourmPostRoute';
import quizRouter from './routers/quizRoute';

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express()
app.use(express.json())
connectDatabase();

const swaggerJsDocs = YAML.load('/home/admin2/Desktop/E_Learning/dist/swagger.yaml')
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))
app.use('/home',userRouter);

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/assignment', assignmentRouter);
app.use('/quiz', quizRouter)
app.use('/forum', forumRouter);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})