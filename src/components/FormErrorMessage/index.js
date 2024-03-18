import style from './style.module.css';

export default function FormErrorMessage({ children }) {
  return (
    <span className={ style.message }>
      { children }
    </span>
  );
}
