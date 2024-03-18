import {useState} from "react";
import { forwardRef } from 'react';
import style from './style.module.css';

function PasswordInput({ setValue, ...props }, ref) {
  const [plaintextValue, setPlaintextValue] = useState('');
  const [visible, setVisible] = useState(false);

  function switchView(e) {
    e.preventDefault();
    setVisible(!visible);
  }

  function plaintextInput(e) {
    setValue('password', e.target.value);
    setPlaintextValue(e.target.value);
  }

  function maskedInput(e) {
    setPlaintextValue(e.target.value);
  }

  return (
    <div className={style.container}>
      { visible && (
        <input
          type="text"
          className={style.input}
          {...props}
          onInput={plaintextInput}
          value={plaintextValue}
        />
      ) }
      { !visible && (
        <input
          type="password"
          ref={ref}
          className={style.input}
          onInput={maskedInput}
          {...props}
        />
      )}
      <button
        type="button"
        className={style.switchButton}
        onClick={ switchView }
      >
        <img
          alt="eye"
          src='./eye.svg'
          className={ style.switchButtonIcon }
        />
      </button>
    </div>
  );
}

export default forwardRef(PasswordInput);
