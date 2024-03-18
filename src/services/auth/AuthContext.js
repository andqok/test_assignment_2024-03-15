import { createContext, useContext, useState } from 'react';
import {apiEndpoint} from "../../config";
import {apiPath} from "./config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({})
  const [errorDetail, setErrorDetail] = useState(null)
  const accessToken = tokens['access_token']
  const tokenExpire = tokens['token_expire']

  function logIn({ email, password }) {
    return new Promise((resolve, reject) => {
      try {
        fetch( `${ apiEndpoint }${apiPath.login}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password,
          })
        } ).then( async (response) => {
          const data = await response.json()

          if (response.status === 200 && data.error === 0) {
            setTokens(data)
            resolve(data)
          } else {
            setErrorDetail(data.detail)
            reject()
          }
        })
      } catch (error) {
        setErrorDetail('Network error')
        reject()
      }
    })
  }

  function refresh() {
    return new Promise((resolve, reject) => {
      try {
        fetch( `${ apiEndpoint }${apiPath.refreshToken}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "refresh_token": tokens['refresh_token'],
          })
        } ).then( async (response) => {
          const data = await response.json()
          if (response.status === 200 && data.error === 0) {
            setTokens(data)
            resolve(data)
          } else {
            setErrorDetail(data.detail)
            reject()
          }
        })
      } catch (error) {
        reject()
      }
    })
  }

  async function fetchWithAuth(url, options) {
    if (tokenExpire < ( Date.now() + 1000) ) {
      const tokens = await refresh()
      return fetch(url, {
        ...options,
        'Authorization': `Bearer ${ tokens['accessToken'] }`
      })
    }
    return fetch(url, {
      ...options,
      'Authorization': `Bearer ${ accessToken }`
    })
  }

  const contextValue = {
    logIn,
    refresh,
    errorDetail,
    fetchWithAuth,
    accessToken,
    tokenExpire,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

