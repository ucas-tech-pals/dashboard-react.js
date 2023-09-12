// DONE REVIEWING: GITHUB COMMIT
import React, {createContext, useEffect, useMemo, useState} from "react"

const Auth = createContext({ready: false, token: null})

export const Provider = function Provider({children}) {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const tokenStored = localStorage.getItem("TOKEN")
    if (!tokenStored) {
      localStorage.setItem("TOKEN", "")
      setToken(null)
    } else setToken(tokenStored)
    setReady(true)
  }, [token])

  const value = useMemo(() => ({ready, token}), [ready, token])
  return <Auth.Provider value={value}>{children}</Auth.Provider>
}

Provider.propTypes = {
  children: React.ReactNode
}

Provider.defaultProps = {
  children: ""
}

export default Auth
