import React from 'react';

interface TaskContextProps {
  tasks: Task[];
  taskIdForEdit: Task['id'] | null;
  checkTask: (id: Task['id']) => void;
  deleteTask: (id: Task['id']) => void;
  selectIdTask: (id: Task['id']) => void;
  addNewTask: ({ task, description }: Omit<Task, 'id' | 'checker'>) => void;
  modifiedTask: ({ task, description }: Omit<Task, 'id' | 'checker'>) => void;
  addDateLogin: (mail: string, password: string) => void;
  allIsValid: boolean | null;
  LogInOut: (logout: boolean) => void;
  logIn: (login: boolean) => void;
}

export const TaskContext = React.createContext<TaskContextProps>({
  tasks: [],
  taskIdForEdit: null,
  checkTask: () => {},
  deleteTask: () => {},
  selectIdTask: () => {},
  addNewTask: () => {},
  modifiedTask: () => {},
  addDateLogin: () => {},
  allIsValid: null,
  LogInOut: () => {},
  logIn: () => {},
});
