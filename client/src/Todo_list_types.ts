export interface TODO_LIST {
  id: string;
  task: string;
  description: string;
  checker: boolean;
  date: Date;
}

export type tasksState = {
  tasks: TODO_LIST[];
  error: string;
};

// Reduser
export enum ActionTypes {
  FETCH_TASKS = 'FETCH_TASKS',
  FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
}

interface FetchTasksAction {
  type: ActionTypes.FETCH_TASKS;
  payload: TODO_LIST[];
}

interface FetchTasksErrorAction {
  type: ActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

export type TaskAction = FetchTasksAction | FetchTasksErrorAction;
