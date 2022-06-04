import { ChangeEvent, FormEvent, useState } from 'react';

import { login } from 'redux/thunk/userThunk';
import { useAppDispatch } from 'redux/store';

import cs from './login.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [stringId, setStringId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const nav = useNavigate();

  // TODO: Change관련 hooks 로 빼서 중복 제거하기
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStringId(e.currentTarget.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    setErrorMessage('');
    e.preventDefault();
    dispatch(login({ stringId, password }))
      .unwrap()
      .catch((err) => {
        const errMessage = err.message.split('Error: ')[1];
        setErrorMessage(errMessage);
      });
  };

  const onClickSignUp = () => {
    nav('/auth/sign-up');
  };

  return (
    <form className={cs.loginForm} onSubmit={onSubmit}>
      <input type='text' value={stringId} placeholder='아이디' onChange={onNameChange} />
      <input type='password' value={password} placeholder='비밀번호' onChange={onPasswordChange} />
      {errorMessage !== '' && <span>{errorMessage}</span>}
      <button className={cs.loginBtn} type='submit'>
        로그인
      </button>
      <button type='button' className={cs.signUpSpan} onClick={onClickSignUp}>
        아직 회원이 아니신가요?
      </button>
    </form>
  );
};

export default Login;
