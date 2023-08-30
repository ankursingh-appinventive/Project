import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DB_NAME;
// const connectionString = 'mongodb://localhost:27017/eLearning';

const connectDatabase = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

export default connectDatabase;