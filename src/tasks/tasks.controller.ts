import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  // Method for the get route
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Declare a variable to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance into an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
      //   throw new Error('Error fetching tasks');
    }
  }

  // Method for the POST route (create a new task)

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    // Create a new task instance

    const newTask = new Task();

    //Add the required properties to the new task instance

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    // Save the task to the database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      // Convert the task instance into an object
      createdTask = instanceToPlain(createdTask) as Task;
      return res.json(createdTask).status(201);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }

  // Method for the PUT route (update an existing task)

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Validate the incoming request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    // Try to fetch the task from the database

    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({ where: { id: req.body.id } });
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
    // Return a 404 status code if the task does not exist

    if (!task) {
      return res.status(404).json({
        error: 'The task with the given ID does not exist',
      });
    }
    // Declare a variable for the updatedTask
    let updatedTask: UpdateResult;
    // Update the task properties

    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      // Convert the updatedTask instance to an object
      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }
  }
}
export const taskController = new TasksController();
