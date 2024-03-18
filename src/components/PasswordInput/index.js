import {useState} from "react";
import { forwardRef } from 'react';
import style from './style.module.css';

function PasswordInput(props, ref) {
  const [value, setValue] = useState('')
  const [visible, setVisible] = useState(false)

  function switchView(e) {
    e.preventDefault();
    setVisible(!visible);
  }

  return (
    <div className={style.container}>
      { visible && (
        <input
          type="text"
          {...props}
          value={value}
          className={style.input}
        />
      ) }
      { !visible && (
        <input
          type="password"
          ref={ref}
          {...props}
          className={style.input}
          onInput={(e) => setValue(e.target.value)}
        />
      )}
      <button
        type="button"
        className={style.switchButton}
        onClick={ switchView }
      >show</button>
    </div>
  )
}

export default forwardRef(PasswordInput)
