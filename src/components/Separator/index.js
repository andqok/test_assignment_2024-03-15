import style from './style.module.css'

export default function Separator() {
  return (
    <div className={ style.container }>
      <div className={style.line} />
      <span className={ style.or }>
        OR
      </span>
      <div className={style.line} />
    </div>
  )
}
