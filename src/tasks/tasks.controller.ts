import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';

export class TaskController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}
  public async getAll(): Promise<Task[]> {
    // Declare a variable to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance into an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;
    } catch (errors) {
      console.log(errors);
    }
  }
}
