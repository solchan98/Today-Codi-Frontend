import { ChangeEvent, FormEvent, useState } from 'react';

import Logo from 'assets/pngs/logo.png';
import { login } from 'redux/thunk/userThunk';
import { useAppDispatch } from 'redux/store';

import cs from './loginForm.module.scss';

const UserInfoInput = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  // TODO: Change관련 hooks 로 빼서 중복 제거하기
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ name, password }));
  };

  return (
    <div className={cs.loginForm}>
      <img className={cs.logo} src={Logo} alt='main_logo' />
      <form onSubmit={onSubmit}>
        <input type='text' value={name} placeholder='아이디' onChange={onNameChange} />
        <input type='password' value={password} placeholder='비밀번호' onChange={onPasswordChange} />
        <button type='submit'>로그인</button>
      </form>
    </div>
  );
};

export default UserInfoInput;
