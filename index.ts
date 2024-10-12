import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';

// Initiate express app
const app: Express = express();
dotenv.config();

// Parse request body

app.use(bodyParser.json());

// Use CORS install types
app.use(cors());

// Log environment variables
// console.log('Environment Variables:');
// console.log('MYSQL_USER:', process.env.MYSQL_USER);
// console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
// console.log('MYSQL_DB:', process.env.MYSQL_DB);

// Create database connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define server port
const port = process.env.PORT;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express & TypeScript Server');
});

console.log('DataSource options:', AppDataSource.options);

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log(
      'Data source is initialised, app is listening on port',
    );
  })
  .catch((err) => {
    console.error(
      'Error during data source initialisation',
      err,
    );
  });
