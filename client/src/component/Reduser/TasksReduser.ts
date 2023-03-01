import { createStore } from 'redux';
import { tasksState, TaskAction, ActionTypes } from '../../Todo_list_types';

const initionState: tasksState = {
  // default state
  tasks: [],
  error: '',
};

export const TasksReduser = (state = initionState, action: TaskAction): tasksState => {
  switch (
    action.type //create a case for each Action
  ) {
    case ActionTypes.FETCH_TASKS_ERROR:
      //In case of an error, we pass the state and the current action
      return { ...state, error: action.payload };
    case ActionTypes.FETCH_TASKS:
      //We reset the error and pass the payload
      return { error: '', tasks: action.payload };
    default:
      return state;
  }
};

const store = createStore(TasksReduser);
