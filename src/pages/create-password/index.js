import style from "./style.module.css";
import AuthLayout from "../../components/AuthLayout";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../components/FormErrorMessage";
import {useCreatePassword} from "../../services/auth/hooks";
import PasswordInput from "../../components/PasswordInput";
import {passwordMaxLength, passwordMinLength} from "../../config";

export default function CreatePassword() {
  let [searchParams] = useSearchParams();
  const {
    createPassword,
  } = useCreatePassword();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    setValue,
    setError,
  } = useForm({});

  const onSubmit = async (data) => {
    if (data.password === data.passwordConfirm) {
      createPassword({
        secret: searchParams.get('secret'),
        token: searchParams.get('token'),
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
    } else {
      setError('passwordConfirm', {
        type: 'custom',
        message: 'Passwords must match.'
      });
    }
  };

  return (
    <AuthLayout title="Create new Password?">
      <form
        className={ style.form }
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>
            Password
            <PasswordInput
              placeholder="Password"
              autoComplete="new-password"
              setValue={setValue}
              { ...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: passwordMinLength,
                  message: `Password must contain minimum ${ passwordMinLength } characters`
                },
                maxLength: {
                  value: passwordMaxLength,
                  message: `Password must contain maximum ${ passwordMaxLength } characters`
                }
              }) }
            />
          </label>
          <FormErrorMessage>
            { errors?.password?.message }
          </FormErrorMessage>
        </div>
        <div>
          <label>
            Confirm Password
            <PasswordInput
              placeholder="Password"
              autoComplete="new-password"
              setValue={setValue}
              { ...register('passwordConfirm', {
                required: 'Please enter the same password again',
                minLength: {
                  value: passwordMinLength,
                  message: `Password must contain minimum ${ passwordMinLength } characters`
                },
                maxLength: {
                  value: passwordMaxLength,
                  message: `Password must contain maximum ${ passwordMaxLength } characters`
                }
              }) }
            />
          </label>
          <FormErrorMessage>
            { errors?.passwordConfirm?.message }
          </FormErrorMessage>
        </div>
        <button
          className="primary">
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}
