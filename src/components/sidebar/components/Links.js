// DONE REVIEWING: GITHUB COMMIT 🔓
import {NavLink, useLocation} from "react-router-dom"
// chakra imports
import {Box, Flex, HStack, Text, useColorModeValue} from "@chakra-ui/react"

export const SidebarLinks = function SidebarLinks(props) {
  //   Chakra color mode
  const location = useLocation()
  const activeColor = useColorModeValue("gray.700", "white")
  const inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  )
  const activeIcon = useColorModeValue("brand.500", "white")
  const textColor = useColorModeValue("secondaryGray.500", "white")
  const brandColor = useColorModeValue("brand.500", "brand.400")

  const {routes} = props

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName)
  }

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routesPassed) => {
    return routesPassed.map((route) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize="md"
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px"
              }}
              pt="18px"
              pb="12px"
              key={route.name}>
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        )
      }
      if (route.layout === "/admin") {
        return (
          <NavLink key={route.name} to={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px">
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px">
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }>
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px">
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }>
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        )
      }
      return null
    })
  }
  //  BRAND
  return createLinks(routes)
}

export default SidebarLinks
