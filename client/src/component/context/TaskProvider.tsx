import axios, { AxiosResponse } from "axios";
import React, { useState, useMemo, useEffect, Dispatch } from "react";
import { TODO_LIST } from "../../Todo_list_types";
import { API } from "../Api/Api";
import { TaskContext } from "./TaskContext";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Array<TODO_LIST>>([]);
  const [taskIdForEdit, setTaskIdForEdit] = useState<Task["id"] | null>(null);
  const [allIsValid, setAllIsValid] = useState<boolean>(true);
  const [theme, setTheme] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Array<TODO_LIST>>(API)
      .then((response) => {
        setTasks(response.data);
        console.log("get all: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching todo list:", error);
      });
  }, []);

  const addNewTask = async ({
    task,
    description,
    date,
  }: Omit<Task, "id" | "checker">) => {
    try {
      const response = await axios.post<TODO_LIST>(API, {
        id: Math.ceil(Math.random() * 10000000000).toString(),
        task: task,
        description: description,
        checker: false,
        date: date,
      });
      console.log(response.data); // the new todo object returned by the server
      axios
        .get<Array<TODO_LIST>>(API)
        .then((response) => {
          setTasks(response.data);
          console.log("get all: ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching todo list:", error);
        });
    } catch (error) {
      console.error(error);
    }

    // setTasks([
    //   ...tasks,
    //   {
    //     id: Math.random().toString(),
    //     task: task,
    //     description: description,
    //     checker: false,
    //     date: date,
    //   },
    // ]);
    // fetchPost({
    //   id: Math.random().toString(),
    //   task: task,
    //   description: description,
    //   checker: false,
    //   date: date,
    // });
  };

  const checkTask = async (id: Task["id"]) => {
    try {
      const todoToUpdate = tasks.find((todo: Task) => todo.id === id);
      console.log("todoToUpdate: ", todoToUpdate);

      // @ts-ignore
      const updatedTodo = { ...todoToUpdate, checker: !todoToUpdate.checker };
      console.log("updateTodo: ", updatedTodo);

      const response = await axios.put<TODO_LIST>(`API/${id}`, updatedTodo);

      const newTodos = tasks.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTasks(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  // const checkTask = async (id: Task["id"]) => {
  //   // setTasks(
  //   //   tasks.map((task) => {
  //   //     if (task.id === id) {
  //   //       return { ...task, checker: !task.checker };
  //   //     }
  //   //     return task;
  //   //   })
  //   // );
  // };

  const deleteTask = (id: Task["id"]) => {
    const delTask = tasks.filter((task) => {
      return task.id !== id;
    });
    console.log(delTask);
    setTasks(delTask);
  };

  const selectIdTask = (id: Task["id"]) => {
    setTaskIdForEdit(id);
  };

  const modifiedTask = ({
    task,
    description,
    date,
  }: Omit<Task, "id" | "checker">) => {
    setTasks(
      tasks.map((tsk) => {
        if (tsk.id === taskIdForEdit) {
          return { ...tsk, task, description, date };
        }
        return tsk;
      })
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
    console.log("@logIn: ", login);
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
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
