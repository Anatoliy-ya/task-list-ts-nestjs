import React, { useState, FC, useEffect } from 'react';
import { Button } from '../UI/Button';
import './TodoPanel.css';
import { useTask } from '../context/useTask';
import { Input } from '../UI/Input';

const DEFAULT_TODO = {
  task: '',
  description: '',
  date: Date,
};

interface AddTaskPanelProps {
  mode: 'add';
}

interface EditTaskPanelProps {
  mode: 'edit';
  editTask: Omit<Task, 'id' | 'checker'>;
}

type TaskPanelProps = AddTaskPanelProps | EditTaskPanelProps;

export const TodoPanel: FC<TaskPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const { addNewTask, modifiedTask, allIsValid } = useTask();

  const [task, setTask] = useState(isEdit ? props.editTask : DEFAULT_TODO);
  const [isValidTask, setIsValidTask] = useState(false);

  useEffect(() => {
    const check = setTimeout(() => {
      const changeElement = task.task.trim().length > 3 && task.description.trim().length > 5;
      setIsValidTask(changeElement ? true : false);

      return () => {
        clearTimeout(check);
      };
    });
  }, [task.task, task.description]);

  const date = new Date();

  const todoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const addTask = () => {
    const taskItem = {
      task: task.task,
      description: task.description,
      date: task.date,
    };
    console.log(taskItem);
    if (isEdit) {
      return modifiedTask(taskItem);
    }
    addNewTask(taskItem);
    setTask(DEFAULT_TODO);
  };

  const clearTask = () => {
    setTask(DEFAULT_TODO);
  };

  return (
    <div className="todo_panel">
      <label className="name">
        <div>Name Task</div>
        <Input
          disabled={!allIsValid}
          type="text"
          name="task"
          className="name"
          value={task.task}
          onChange={todoHandler}
        />
      </label>
      <label className="description">
        <div>Description</div>
        <Input
          disabled={!allIsValid}
          type="text"
          name="description"
          className="description"
          value={task.description}
          onChange={todoHandler}
        />
      </label>
      <label className="date">
        <div>Date</div>
        <Input
          disabled={!allIsValid}
          type="date"
          name="date"
          className="date"
          value={task.date}
          onChange={todoHandler}
        />
      </label>
      <div>
        {isEdit ? (
          <div>
            <Button
              disabled={!isValidTask}
              color={isValidTask ? 'update' : 'update_disabled'}
              onClick={addTask}>
              UPDATE
            </Button>
            <Button color="clear" onClick={clearTask}>
              CLEAR
            </Button>
          </div>
        ) : (
          <Button
            disabled={!isValidTask}
            color={isValidTask ? 'blue' : 'disabled_add'}
            onClick={addTask}>
            ADD
          </Button>
        )}
      </div>
    </div>
  );
};
