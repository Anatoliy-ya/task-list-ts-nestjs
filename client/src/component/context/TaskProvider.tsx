import axios from 'axios';
import React, { useState, useMemo, useEffect, Dispatch } from 'react';
import { TODO_LIST } from '../../Todo_list_types';
import { API } from '../Api/Api';
import { TaskContext } from './TaskContext';

interface TaskProviderProps {
  children: React.ReactNode;
}

const TODO_LIST_STATE: Array<TODO_LIST> = [];

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState(TODO_LIST_STATE);
  const [taskIdForEdit, setTaskIdForEdit] = useState<Task['id'] | null>(null);
  const [allIsValid, setAllIsValid] = useState<boolean>(true);
  const [theme, setTheme] = useState<boolean>(true);

  const fetchPost = async (data: TODO_LIST) => {
    await fetch(API, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return console.log(data);
      });
  };

  const addNewTask = ({ task, description, date }: Omit<Task, 'id' | 'checker'>) => {
    const idNum = Math.random().toString();
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        task: task,
        description: description,
        checker: false,
        date: date,
      },
    ]);
    fetchPost({
      id: idNum,
      task: task,
      description: description,
      checker: false,
      date: date,
    });
  };

  const checkTask = (id: Task['id']) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, checker: !task.checker };
        }
        return task;
      }),
    );
  };

  const deleteTask = (id: Task['id']) => {
    const delTask = tasks.filter((task) => {
      return task.id !== id;
    });
    console.log(delTask);
    setTasks(delTask);
  };

  const selectIdTask = (id: Task['id']) => {
    setTaskIdForEdit(id);
  };

  const modifiedTask = ({ task, description, date }: Omit<Task, 'id' | 'checker'>) => {
    setTasks(
      tasks.map((tsk) => {
        if (tsk.id === taskIdForEdit) {
          return { ...tsk, task, description, date };
        }
        return tsk;
      }),
    );
    setTaskIdForEdit(null);
  };

  // После нажания logout меняется глабальное состояние AllIsValid на false
  const LogInOut = (logout: boolean) => {
    setAllIsValid(logout);
  };

  // Данные идут из Registration если все условия выполнены
  const addDateLogin = (mail: string, password: string) => {
    localStorage.setItem(mail, password);
  };

  const logIn = (login: boolean) => {
    setAllIsValid(login);
    console.log('@logIn: ', login);
  };

  const value = useMemo(
    () => ({
      tasks,
      taskIdForEdit,
      checkTask,
      deleteTask,
      selectIdTask,
      addNewTask,
      modifiedTask,
      addDateLogin,
      LogInOut,
      logIn,
      allIsValid,
    }),
    [
      tasks,
      taskIdForEdit,
      checkTask,
      deleteTask,
      selectIdTask,
      addNewTask,
      modifiedTask,
      addDateLogin,
      LogInOut,
      logIn,
      allIsValid,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
