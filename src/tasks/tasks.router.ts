import { Router, Request, Response } from 'express';
import { TaskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validationResult } from 'express-validator';

// Fire the router function
export const tasksRouter: Router = Router();

// Define the default route
tasksRouter.get(
  '/tasks',
  async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const allTasks = await taskController.getAll();
    res.json(allTasks).status(200);
  },
);

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
