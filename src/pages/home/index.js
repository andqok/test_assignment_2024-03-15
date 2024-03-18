import {useAuth} from "../../services/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {apiEndpoint} from "../../config";
import {apiPath} from "../../services/auth/config";

export default function Home() {
  const { accessToken, tokenExpire, fetchWithAuth } = useAuth()

  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  return (
    <div>
      { accessToken }
      <div>
        { (new Date(tokenExpire).toLocaleString()) }
      </div>
      <button onClick={() => {
        // fetchWithAuth(`${ apiEndpoint }/secure`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     'token': 'baka'
        //   })
        // })
      }}>
        Fetch new
      </button>
    </div>
  )
}
