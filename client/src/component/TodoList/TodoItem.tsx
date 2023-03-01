import React, { FC } from 'react';
import { Button } from '../UI/Button';
import './TodoItem.css';
import { useTask } from '../context/useTask';

interface TodoItemProps {
  task: Task;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const { checkTask, selectIdTask, deleteTask } = useTask();

  return (
    <div className="task_container">
      <div className="task_date">{task.date}</div>
      <div
        onClick={() => checkTask(task.id)}
        className="task_name"
        style={{
          opacity: task.checker ? 0.5 : 1,
          textDecoration: task.checker ? 'line-through' : 'none',
        }}>
        {task.task}
      </div>

      <div className="task_description">{task.description}</div>
      <div className="button_container">
        <Button color="orange" onClick={() => selectIdTask(task.id)}>
          EDIT
        </Button>
        <Button color="red" onClick={() => deleteTask(task.id)}>
          DELETE
        </Button>
      </div>
    </div>
  );
};
