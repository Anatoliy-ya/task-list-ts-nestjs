import React from 'react';
import { TodoPanel } from '../TodoPanel/TodoPanel';
import { TodoItem } from './TodoItem';
import { useTask } from '../context/useTask';
import './TodoList.css';

export const TodoList: React.FC = () => {
  const { taskIdForEdit, tasks } = useTask();
  const countTasks = tasks.length >= 1;

  const todoItemMap = tasks.map((task) => {
    {
      if (taskIdForEdit === task.id)
        return (
          <TodoPanel
            editTask={{
              task: task.task,
              description: task.description,
              date: task.date,
            }}
            mode="edit"
          />
        );
    }
    return <TodoItem key={task.id} task={task} />;
  });

  return (
    <div className={countTasks ? 'todolist_container' : ''}>
      <div>{todoItemMap}</div>
    </div>
  );
};
