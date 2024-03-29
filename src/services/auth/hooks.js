import {useState} from "react";
import {apiPath} from "./config";
import {apiEndpoint} from "../../config";

export function usePasswordReset() {
  const [success, setSuccess] = useState(undefined);
  const [failureDetail, setFailureDetail] = useState('');
  const [successDetail, setSuccessDetail] = useState('');

  function reset({email}) {
    try {
      fetch( `${ apiEndpoint }${apiPath.passwordReset }`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
        })
      } ).then( async (response) => {
        if (response.status === 200) {
          const data = await response.json();

          if (data.error !== 0) {
            setSuccess(true);
            setSuccessDetail(data.detail);
          } else {
            setSuccess(false);
            setFailureDetail(data.detail);
          }
        } else {
          const data = await response.json();
          setSuccess(false);
          setFailureDetail(data.detail);
        }
      }).catch(() => {
        setSuccess(false);
      });
    } catch (error) {
      setSuccess(false);
      setFailureDetail('Network error, please try again.');
    }
  }

  return {
    success,
    setFailureDetail,
    failureDetail,
    successDetail,
    reset,
  };
}


export function useCreatePassword() {
  const [success, setSuccess] = useState(false);

  function createPassword({
     token,
     secret,
     password,
     passwordConfirm,
  }) {
    setSuccess(false);

    fetch( `${ apiEndpoint }${apiPath.passwordSetNew}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        password,
        secret,
        password_confirm: passwordConfirm,
      })
    } ).then( async (response) => {
      if (response.status === 200) {
        try {
          const data = await response.json()
          if (data.error === 0) {
            setSuccess(true)
          } else {
            setSuccess(false)
          }
        } catch (error) {
          setSuccess(false)
        }
      }
    }).catch((error) => {
      setSuccess(false);
    })
  }

  return {
    success,
    createPassword,
  };
}

