import cx from 'classnames';
import { useState, ChangeEvent } from 'react';

import { ISignUp } from 'types/user';
import { checkDuplicateUserId, signUp } from 'services/user';

import cs from './signUp.module.scss';
import { useNavigate } from 'react-router-dom';

const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const SignUp = () => {
  const [id, setId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [password, setPassword] = useState('');
  const [isInvalidPw, setIsInvalidPw] = useState(false);
  const [nickname, setNickname] = useState('');

  const nav = useNavigate();

  // TODO: change 커스텀 훅스 너무 마렵다,, 시간이 없으니 우선 구현..
  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const onBlurIdInput = () => {
    if (id !== '') {
      checkDuplicateUserId(id).then((res) => {
        setIsDuplicate(res.isDup);
      });
    } else {
      setIsDuplicate(false);
    }
  };

  const onBlurPasswordInput = () => {
    const result = PASSWORD_REG_EXP.test(password);
    if (!result) {
      setIsInvalidPw(true);
    } else {
      setIsInvalidPw(false);
    }
  };

  const onSubmit = () => {
    const userInfo: ISignUp = {
      stringId: id,
      nickname,
      password,
    };
    signUp(userInfo).then(() => {
      nav('/auth/login');
    });
  };

  return (
    <form className={cs.signForm} onSubmit={onSubmit}>
      <div className={cs.signUpInput}>
        <label>
          아이디
          <input
            className={cx(isDuplicate && cs.isWrong)}
            value={id}
            type='text'
            placeholder='아이디'
            onChange={onChangeId}
            onBlur={onBlurIdInput}
          />
        </label>
        {isDuplicate && <div>이미 존재하는 아이디입니다.</div>}
      </div>
      <div className={cs.signUpInput}>
        <label>
          비밀번호
          <input
            className={cx(isInvalidPw && cs.isWrong)}
            value={password}
            type='password'
            placeholder='비밀번호'
            onChange={onChangePassword}
            onBlur={onBlurPasswordInput}
          />
        </label>
        <div className={cx(cs.passwordInfo, isInvalidPw && cs.isWrongText)}>
          최소 8 자, 최소 하나의 문자 및 하나의 숫자
        </div>
      </div>
      <div className={cs.signUpInput}>
        <label>
          닉네임
          <input value={nickname} type='text' placeholder='닉네임' onChange={onChangeNickname} />
        </label>
      </div>
      <button disabled={isDuplicate || isInvalidPw} className={cs.signUpBtn} type='submit'>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
