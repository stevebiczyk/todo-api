import { Router, Request, Response } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator';

// Fire the router function
export const tasksRouter: Router = Router();

// Define the default route
tasksRouter.get('/tasks', taskController.getAll);

tasksRouter.post(
  '/tasks',
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    // const taskController = new TaskController();
    // const newTask = await taskController.create(req.body);
    // res.json(newTask).status(201);
  },
);
