import {useAuth} from "../../services/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {
  const { accessToken, tokenExpire } = useAuth()

  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div>
      { accessToken }
      <div>
        { (new Date(tokenExpire).toLocaleString()) }
      </div>
      <button onClick={() => {}}>
        Fetch new
      </button>
    </div>
  )
}
