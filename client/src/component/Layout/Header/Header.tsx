import { FC, useState } from 'react';
import { useTask } from '../../context/useTask';
import { Login } from '../../Login/Login';
import { Registration } from '../../Login/Registration/Registration';
import { Button } from '../../UI/Button';
import './Header.css';

export const Header: FC = () => {
  const { tasks, allIsValid, LogInOut } = useTask();
  const [onLogin, setOnLogin] = useState<boolean | null>(false);
  const [onReg, setOnReg] = useState<boolean | null>(false);

  return (
    <div className="header_container">
      <div className="header_task">
        {!allIsValid ? 'Todo list' : <span>Todo list {tasks.length} taks(s)</span>}
        {allIsValid && (
          <div className="button_logout">
            <Button color="logout" onClick={() => LogInOut(false)}>
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className="login_container">
        {!allIsValid && (
          <Button color="login" onClick={() => setOnLogin(true)}>
            Login
          </Button>
        )}
        {onLogin && <Login active={onLogin} />}
      </div>
      <div className="reg_container">
        {!allIsValid && (
          <Button color="registration" onClick={() => setOnReg(true)}>
            Registration
          </Button>
        )}
        {onReg && <Registration active={onReg} />}
      </div>
    </div>
  );
};
