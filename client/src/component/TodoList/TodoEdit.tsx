import React, { FC, useState } from 'react';
import { Button } from '../UI/Button';

const DEFAULT_TODO = {
  task: '',
  description: '',
};

interface EditTaskProps {
  task: () => Task;
  onAppEditTask: (task: Task, isValidEdit: boolean) => void;
  onIdEditTask?: Task;
}

export const TodoEdit: React.FC<EditTaskProps> = ({ task, onAppEditTask, onIdEditTask }) => {
  const [editer, setEditer] = useState(task);
  const [inputEdit, setInputEdit] = useState(DEFAULT_TODO);
  console.log(task);
  console.log(onIdEditTask);

  const idIsFromItem = () => {
    if (editer.id === onIdEditTask?.id) {
      return setEditer({
        ...editer,
        task: inputEdit.task,
        description: inputEdit.description,
      });
    }
  };

  const taskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputEdit({ ...inputEdit, [name]: value });
  };

  return (
    <div className="todo_panel">
      <label className="name">
        <div>Name</div>
        <input type="text" name="task" id="name" value={editer.task} onChange={taskHandler} />
      </label>
      <label className="description">
        <div>Description</div>
        <input
          type="text"
          name="description"
          id="name"
          value={editer.description}
          onChange={taskHandler}
        />
      </label>
      <div>
        <Button color="blue" onClick={() => onAppEditTask(editer, false)}>
          OK "EDIT"
        </Button>
      </div>
    </div>
  );
};
