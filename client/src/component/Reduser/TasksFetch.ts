import axios from 'axios';
import { Dispatch } from 'react';
import { ActionTypes, TaskAction } from '../../Todo_list_types';
import { API } from '../Api/Api';

export const TasksFetch = () => {
  return async (dispatch: Dispatch<TaskAction>) => {
    try {
      const response = await axios.get(API);
      dispatch({ type: ActionTypes.FETCH_TASKS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: ActionTypes.FETCH_TASKS_ERROR, payload: 'ERROR' });
    }
  };
};
