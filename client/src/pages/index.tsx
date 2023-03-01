import { FC } from 'react';
import { useTask } from '../component/context';
import { TodoPanel } from '../component/TodoPanel/TodoPanel';
import { TodoList } from '../component/TodoList/TodoList';
import './index.css';
import { Layout } from '../component/Layout/Layout';

export const Index: FC = () => {
  const { allIsValid, tasks } = useTask();

  const countTasks = tasks.length >= 1;
  return (
    <div className="index_container">
      <Layout>
        <TodoPanel mode="add" />
        {allIsValid ? (
          <TodoList />
        ) : (
          <span className="span_task">Здесь могли быть твои Задачи</span>
        )}
        {!countTasks ? <span className="span_task">Здесь могли быть твои Задачи</span> : ''}
      </Layout>
    </div>
  );
};
