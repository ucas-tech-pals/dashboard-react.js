// DONE REVIEWING: GITHUB COMMIT 🔓
import {localStorageTokenKey, localStorageUserKey} from "plugins/client"
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

const Auth = createContext({ready: false, token: null})

export const Provider = function Provider({children}) {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const signIn = useCallback((response) => {
    localStorage.removeItem(localStorageTokenKey)
    localStorage.removeItem(localStorageUserKey)
    localStorage.setItem(localStorageTokenKey, response.access_token)
    localStorage.setItem(localStorageUserKey, JSON.stringify(response.data))
    setToken(response.access_token)
    setUser(response.data)
  }, [])

  useEffect(() => {
    setReady(true)
  }, [])

  const value = useMemo(
    () => ({ready, token, user, signIn}),
    [ready, token, user, signIn]
  )
  return <Auth.Provider value={value}>{children}</Auth.Provider>
}

Provider.propTypes = {
  children: React.ReactNode
}

Provider.defaultProps = {
  children: ""
}

export default Auth
