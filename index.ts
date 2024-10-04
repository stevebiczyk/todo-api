import express, { Express, Request, Response } from 'express';

// Initiate express app
const app: Express = express();

// Define server port
const port = 3200;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express & TypeScript Server');
});

// Start listening to requests on the defined port
app.listen(port);
