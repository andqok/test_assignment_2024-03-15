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
import FormErrorMessage from "../../components/FormErrorMessage";

export default function Login() {
  const { accessToken, logIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
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
    try {
      await logIn(data);
    } catch (error) {
      if (Array.isArray(error)) {
        for (let errorItem of error) {
          setError(errorItem['field_name'], {
            type: 'custom',
            message: errorItem.error,
          });
        }
      } else if (typeof error === 'string') {
        setError('password', {
          type: 'custom',
          message: error,
        });
      }
    }
  };

  return (
    <AuthLayout title="Log in to your account">
      <SingleSignOn />
      <Separator />
      <form
        className={ style.form }
        onSubmit={handleSubmit(handleSubmit2)}
      >
        <div>
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
          <FormErrorMessage>
            { errors?.email?.message }
          </FormErrorMessage>
        </div>
        <div>
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
          <FormErrorMessage>
            { errors?.password?.message }
          </FormErrorMessage>
        </div>
        <Link
          className={style.forgotLink}
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <button
          className="primary"
        >
          Log in to { brandName }
        </button>
      </form>
      <p className={style.signUpInvite}>
        Is your company new to { brandName }? <Link to="#">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
