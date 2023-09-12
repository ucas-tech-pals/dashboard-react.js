// DONE REVIEWING: GITHUB COMMIT
// Chakra imports
import {Box, Portal, useDisclosure} from "@chakra-ui/react"
import Footer from "components/footer/FooterAdmin.js"
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js"
import Sidebar from "components/sidebar/Sidebar.js"
import {SidebarContext} from "contexts/SidebarContext"
import {useContext, useMemo, useState} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import routes from "routes.js"
import Auth from "stores/auth"

// Custom Chakra theme
export default function Dashboard(props) {
  const auth = useContext(Auth)
  const {...rest} = props
  // states and functions
  const [fixed] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps"
  }
  const getActiveRoute = (routesPassed) => {
    const activeRoute = "Default Brand Text"
    for (let index = 0; index < routesPassed.length; index += 1) {
      if (routesPassed[index].collapse) {
        const collapseActiveRoute = getActiveRoute(routesPassed[index].items)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else if (routesPassed[index].category) {
        const categoryActiveRoute = getActiveRoute(routesPassed[index].items)
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute
        }
      } else if (
        window.location.href.indexOf(
          routesPassed[index].layout + routesPassed[index].path
        ) !== -1
      ) {
        return routesPassed[index].name
      }
    }
    return activeRoute
  }
  const getActiveNavbar = (routesPassed) => {
    const activeNavbar = false
    for (let index = 0; index < routesPassed.length; index += 1) {
      if (routesPassed[index].collapse) {
        const collapseActiveNavbar = getActiveNavbar(routesPassed[index].items)
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar
        }
      } else if (routesPassed[index].category) {
        const categoryActiveNavbar = getActiveNavbar(routesPassed[index].items)
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar
        }
      } else if (
        window.location.href.indexOf(
          routesPassed[index].layout + routesPassed[index].path
        ) !== -1
      ) {
        return routesPassed[index].secondary
      }
    }
    return activeNavbar
  }
  const getActiveNavbarText = (routesPassed) => {
    const activeNavbar = false
    for (let index = 0; index < routesPassed.length; index += 1) {
      if (routesPassed[index].collapse) {
        const collapseActiveNavbar = getActiveNavbarText(
          routesPassed[index].items
        )
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar
        }
      } else if (routesPassed[index].category) {
        const categoryActiveNavbar = getActiveNavbarText(
          routesPassed[index].items
        )
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar
        }
      } else if (
        window.location.href.indexOf(
          routesPassed[index].layout + routesPassed[index].path
        ) !== -1
      ) {
        return routesPassed[index].messageNavbar
      }
    }
    return activeNavbar
  }
  const getRoutes = (routesPassed) => {
    return routesPassed.map((prop) => {
      if (prop.layout === "/admin") {
        if (auth.token)
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={prop.layout + prop.path}
            />
          )
        return <Redirect from={prop.layout + prop.path} to="/auth/sign-in" />
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
  document.documentElement.dir = "ltr"
  const {onOpen} = useDisclosure()
  document.documentElement.dir = "ltr"
  const value = useMemo(
    () => ({toggleSidebar, setToggleSidebar}),
    [toggleSidebar, setToggleSidebar]
  )
  return (
    <Box>
      <Box>
        <SidebarContext.Provider value={value}>
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{base: "100%", xl: "calc( 100% - 290px )"}}
            maxWidth={{base: "100%", xl: "calc( 100% - 290px )"}}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease">
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText="Horizon UI Dashboard PRO"
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {getRoute() ? (
              <Box
                mx="auto"
                p={{base: "20px", md: "30px"}}
                pe="20px"
                minH="100vh"
                pt="50px">
                {auth.ready ? (
                  <Switch>
                    {getRoutes(routes)}
                    <Redirect from="/" to="/admin/default" />
                  </Switch>
                ) : null}
              </Box>
            ) : null}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  )
}
