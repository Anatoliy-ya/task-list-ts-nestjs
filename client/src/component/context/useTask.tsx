import React from 'react';
import { TaskContext } from './TaskContext';

export const useTask = () => React.useContext(TaskContext);
