import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

// Fire the router function
export const tasksRouter: Router = Router();

// Define the default route
//@ts-ignore
tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  //@ts-ignore
  taskController.create,
);
