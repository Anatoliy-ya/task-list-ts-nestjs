import React, { FC, useContext, useEffect, useReducer, useState } from 'react';

import { TaskContext, useTask } from '../context';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Modal } from '../UI/Modal';
import './Login.css';
import { LoginMailReducer } from './LoginEmailReducer';
import { LoginPasswordReducer } from './LoginPasswordReducer';

interface LoginProps {
  active: boolean;
}

export const Login: FC<LoginProps> = ({ active }) => {
  const arrLocalKeys = Object.keys(localStorage);
  const ctx = useContext(TaskContext);

  const [isValidForm, setIsValidForm] = useState();
  const [isModal, setIsModal] = useState<boolean | null>(active);
  const [checkMail, setCheckMail] = useState(true);
  const [emailState, dispatchEmailState] = useReducer(LoginMailReducer, {
    value: '',
    isValid: Boolean,
  });
  const [passwordState, dispatchPasswordState] = useReducer(LoginPasswordReducer, {
    value: '',
    isValid: Boolean,
  });

  const { isValid: isValidMail } = emailState;
  const { isValid: isValidPassword } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValidForm(isValidMail && isValidPassword);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchEmailState({ type: 'INPUT_USER', value: event.target.value });
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPasswordState({
      type: 'INPUT_USER',
      value: event.target.value,
    });
  };

  const validEmailValid = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' });
    const mapLocalKeys = arrLocalKeys.includes(emailState.value);
    console.log('login', mapLocalKeys);
    setCheckMail(mapLocalKeys);
    console.log('if active');
  };

  const validPasswordValid = () => {
    dispatchPasswordState({ type: 'INPUT_BLUR' });
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      arrLocalKeys.includes(emailState.value) &&
      localStorage.getItem(emailState.value) === passwordState.value
    ) {
      ctx.logIn(true);
      console.log('@logIn: ', true);
    }

    dispatchEmailState({ value: '' });
    dispatchPasswordState({ value: '' });
  };

  const changeModal = (active: boolean) => {
    setIsModal(active);
    console.log('@login Cancel: ', active);
  };
  console.log('Login: ', isModal);

  return (
    <Modal active={isModal}>
      <form onSubmit={formSubmit}>
        <div>
          <div className="login">Login</div>
          {checkMail ? (
            ''
          ) : (
            <span className="span_error">Пользователя с таким Email не существует</span>
          )}
          <div className="mail">Email</div>
          <Input
            placeholder="Email"
            className={emailState.isValid ? 'input_mail' : 'input_mail_error'}
            type="mail"
            name="mail"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validEmailValid}
          />
        </div>
        <div>
          <div className="password">Password</div>
          <Input
            placeholder="Password"
            className={passwordState.isValid ? 'input_password' : 'input_password_error'}
            type="password"
            name="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validPasswordValid}
          />
        </div>
        <div>
          <Button color="login" disabled={!isValidForm} onClick={() => changeModal(false)}>
            Login
          </Button>
        </div>
        <div>
          <Button color="cancel" onClick={() => changeModal(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
