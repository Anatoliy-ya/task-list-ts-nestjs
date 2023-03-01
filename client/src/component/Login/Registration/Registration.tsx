import { emit } from 'process';
import React, { FC, useContext, useEffect, useReducer, useState } from 'react';

import { TaskContext, useTask } from '../../context';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import { Modal } from '../../UI/Modal';
import { EmailReducer } from './EmailReducer';
import { PasswordReducer } from './PasswordReducer';
import './Registration.css';

interface RegistrationProps {
  active: boolean;
}

export const Registration: FC<RegistrationProps> = ({ active }) => {
  const { addDateLogin } = useTask();

  const [isValidForm, setIsValidForm] = useState(Boolean);
  const [checkMail, setCheckMail] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean | null>(active);
  const [emailState, dispatchEmailState] = useReducer(EmailReducer, {
    value: '',
    isValid: Boolean,
  });
  const [passwordState, dispatchPasswordState] = useReducer(PasswordReducer, {
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
    const arrLocalKeys = Object.keys(localStorage);
    const mapLocalKeys = arrLocalKeys.includes(emailState.value);
    console.log('Regg', !mapLocalKeys);

    setCheckMail(!mapLocalKeys);
  };

  const validPasswordValid = () => {
    dispatchPasswordState({ type: 'INPUT_BLUR' });
  };

  let youCreat = false;
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidForm === true) {
      let mailSTR = String(emailState.value);
      let passwordSTR = String(passwordState.value);
      addDateLogin(mailSTR, passwordSTR);
      youCreat = true;
    }
    dispatchEmailState({ value: '' });
    dispatchPasswordState({ value: '' });
  };

  // console.log(emailState.value, passwordState.value);
  // localStorage.setItem(emailState.value, passwordState.value);
  // console.log("local storage: ", localStorage.getItem("LoginIs"));

  const changeModal = (active: boolean) => {
    setIsModal(active);
    console.log('@login Cancel: ', active);
  };
  console.log('Reg: ', isModal);

  return (
    <Modal active={isModal}>
      <form onSubmit={formSubmit}>
        <div className="registration">Registration</div>
        <div>
          {youCreat ? <span className="span_creat">Вы зарегестрированы </span> : ''}
          {checkMail ? '' : <span className="span_error">Email уже занят</span>}
          <div className="mail">Email</div>
          <Input
            placeholder="Email@mail.com"
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
          <Button color="registration" disabled={!isValidForm} onClick={() => changeModal(false)}>
            Registration
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
