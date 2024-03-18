import {useAuth} from "../../services/auth/AuthContext";
import AuthLayout from "../../components/AuthLayout";
import {brandName, passwordMaxLength, passwordMinLength} from "../../config";
import { Link } from "react-router-dom";
import style from './style.module.css';
import { useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import SingleSignOn from "../../components/SingleSignOn";
import Separator from "../../components/Separator";
import {useEffect} from "react";
import PasswordInput from "../../components/PasswordInput";

export default function Login() {
  const { accessToken, logIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const handleSubmit2 = async (data) => {
    await logIn(data);
    navigate('/');
  };

  return (
    <AuthLayout title="Log in to your account">
      <SingleSignOn />
      <Separator />
      <form
        className={ style.form }
        onSubmit={handleSubmit(handleSubmit2)}
      >
        <input
          type="email"
          placeholder="Email"
          { ...register('email', {
            required: 'Please enter email',
            maxLength: {
              value: 512,
              message: `Password must contain maximum ${ passwordMaxLength } characters`
            }
          }) }
        />
        { errors?.email?.message }
        <PasswordInput
          placeholder="Password"
          {...register('password', {
            required: 'Please enter password',
            minLength: {
              value: passwordMinLength,
              message: `Password must contain minimum ${ passwordMinLength } characters`
            },
            maxLength: {
              value: passwordMaxLength,
              message: `Password must contain maximum ${ passwordMaxLength } characters`
            }
          })}
        />
        { errors?.password?.message }
        <Link
          className={style.forgotLink}
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <button
          className="primary"
          onClick={ () => logIn({
        }) }>
          Log in to { brandName }
        </button>
      </form>
      <p className={style.signUpInvite}>
        Is your company new to { brandName }? <Link to="#">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
