import {usePasswordReset} from "services/auth/hooks";
import style from "./style.module.css";
import AuthLayout from "../../components/AuthLayout";
import { useForm} from "react-hook-form";
import classNames from "classnames";
import FormErrorMessage from "../../components/FormErrorMessage";

export default function ResetPassword() {
  const {
    reset,
    success,
    failureDetail,
    successDetail,
    setFailureDetail,
  } = usePasswordReset();
  const {
    register,
    handleSubmit,
  } = useForm({});

  return (
    <AuthLayout title="Forgot Password?">
      {
        (success === true)
          ? (<p>{ successDetail }</p>)
          : (
            <form
              className={ style.form }
              onSubmit={handleSubmit(reset)}
            >
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onInput={ () => setFailureDetail("") }
                  maxLength={512}
                  { ...register("email", {
                    required: "Please enter email",
                  }) }
                />
                { success === false && <FormErrorMessage>{ failureDetail }</FormErrorMessage> }
              </div>
              <button
                className={ classNames("primary", style.send)}
                type="submit"
              >
                Send
              </button>
              <button
                className={ classNames("secondary", style.cancel) }
                type="button"
              >
                Cancel
              </button>
            </form>
          )
      }
    </AuthLayout>
  );
}
