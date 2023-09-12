// DONE REVIEWING: GITHUB COMMIT
import {useContext, useMemo, useState} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import routes from "routes.js"
import AuthContext from "stores/auth"

// Chakra imports
import {Box, useColorModeValue} from "@chakra-ui/react"

// Layout components
import {SidebarContext} from "contexts/SidebarContext"

// Custom Chakra theme
export default function Auth() {
  const auth = useContext(AuthContext)
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false)
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/auth/full-screen-maps"
  }
  const getRoutes = (routesPassed) => {
    return routesPassed.map((prop) => {
      if (prop.layout === "/auth") {
        if (!auth.token)
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={prop.layout + prop.path}
            />
          )
        return <Redirect from={prop.layout + prop.path} to="/admin/default" />
      }
      if (prop.collapse) {
        return getRoutes(prop.items)
      }
      if (prop.category) {
        return getRoutes(prop.items)
      }
      return null
    })
  }
  const authBg = useColorModeValue("white", "navy.900")
  document.documentElement.dir = "ltr"
  const value = useMemo(
    () => ({
      toggleSidebar,
      setToggleSidebar
    }),
    [toggleSidebar, setToggleSidebar]
  )
  return (
    <Box>
      <SidebarContext.Provider value={value}>
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease">
          {getRoute() ? (
            <Box mx="auto" minH="100vh">
              <Switch>
                {getRoutes(routes)}
                <Redirect
                  from="/auth"
                  to="/auth/sign-in/default
                  "
                />
              </Switch>
            </Box>
          ) : null}
        </Box>
      </SidebarContext.Provider>
    </Box>
  )
}
