import { Router } from 'express';
import { taskController } from './tasks.controller';
import {
  createValidator,
  updateValidator,
} from './tasks.validator';

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

tasksRouter.put(
  '/tasks',
  updateValidator,
  //@ts-ignore
  taskController.update,
);
