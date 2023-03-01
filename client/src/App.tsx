import { TaskProvider } from './component/context';
import { Index } from './pages/index';
import './App.css';
import { API } from './component/Api/Api';

function App() {
  return (
    <div className="bg">
      <TaskProvider>
        <Index />
      </TaskProvider>
    </div>
  );
}
export default App;
