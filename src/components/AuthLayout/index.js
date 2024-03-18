import style from './style.module.css'
import {brandName} from "../../config";

export default function AuthLayout({ title, children }) {
  return (
    <div className={ style.authLayout }>
      <div className={ style.container }>
        <img className={ style.logo } alt={ brandName } src={'./qencode-logo.svg'}/>
        <h1 className={style.heading}>
          { title }
        </h1>
        <div className={ style.main }>
          { children }
        </div>
      </div>
    </div>
  )
}
