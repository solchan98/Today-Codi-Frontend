import cs from './login.module.scss';
import LoginForm from '../../components/login/LoginForm';

const Login = () => {
  return (
    <div className={cs.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;
