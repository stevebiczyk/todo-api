import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

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

  // Method for the post route

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
    // const newTask = new Task();
    // newTask.title = req.body.title;
    // newTask.description = req.body.description;
    // newTask.date = new Date();
    // //Add the required properties to the new task instance
    // // Save the task to the database
    // try {
    //     await AppDataSource.getRepository(Task).save(newTask);
    //     return res.json(newTask).status(201);
    // } catch (errors) {
    //     return res
    //         .json({ error: 'Internal Server Error' })
    //         .status(500);
    // }
  }
}

export const taskController = new TasksController();
