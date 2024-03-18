import style from './style.module.css';
import classNames from "classnames";

export default function SingleSignOn() {
  return (
    <div className={ style.ssoContainer }>
      <SsoButton
        src="./google.svg"
        alt="Google"
        text="Google"
      />
      <SsoButton
        src="./github.svg"
        alt="Github"
        text="Github"
      />
    </div>
  );
}

function SsoButton({ src, alt, text }) {
  return (
    <button className={ classNames( 'secondary', style.ssoItem ) }>
      <img
        className={ style.image }
        alt={ alt }
        src={ src }
      />
      { text }
    </button>
  );
}
