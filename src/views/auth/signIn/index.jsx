// DONE REVIEWING: GITHUB COMMIT 🔒
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
// Custom components
import DefaultAuth from "layouts/auth/Default"
// Assets
// eslint-disable-next-line
import illustration from "assets/img/auth/auth.png"
import client from "plugins/client"
import {MdOutlineRemoveRedEye} from "react-icons/md"
import {RiEyeCloseLine} from "react-icons/ri"
import Auth from "stores/auth"

const SignIn = function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white")
  const textColorSecondary = "gray.400"
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600")
  const textColorBrand = useColorModeValue("brand.500", "white")
  const brandStars = useColorModeValue("brand.500", "brand.400")
  const {signIn} = useContext(Auth)
  const [accountType, setAccountType] = React.useState("user")
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const handleInputChange = (value, setterFunction) => setterFunction(value)
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{base: "100%", md: "max-content"}}
        w="100%"
        mx={{base: "auto", lg: "0px"}}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{base: "30px", md: "60px"}}
        px={{base: "25px", md: "0px"}}
        mt={{base: "40px", md: "14vh"}}
        flexDirection="column">
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md">
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{base: "100%", md: "420px"}}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{base: "auto", lg: "unset"}}
          me="auto"
          mb={{base: "20px", md: "auto"}}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px">
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired
              variant="auth"
              fontSize="sm"
              ms={{base: "0px", md: "0px"}}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={({currentTarget: {value}}) =>
                handleInputChange(value, setEmail)
              }
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex">
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={({currentTarget: {value}}) =>
                  handleInputChange(value, setPassword)
                }
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{cursor: "pointer"}}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <RadioGroup
              colorScheme="brand"
              mb="24px"
              value={accountType}
              onChange={setAccountType}>
              <Stack direction="row" gap="12px">
                <Radio value="user">User</Radio>
                <Radio value="university">University</Radio>
              </Stack>
            </RadioGroup>
            <Button
              isDisabled={!email || !password}
              isLoading={isLoading}
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={() => {
                if (!email || !password) return
                setIsLoading(true)
                client(`${accountType}/login`, {
                  method: "POST",
                  body: JSON.stringify({email, password})
                })
                  .then((response) => signIn(response))
                  .catch(() => {
                    // Do something here about error
                  })
                  .finally(() => setIsLoading(false))
              }}>
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px">
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Do not you have an account?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500">
                  Create an account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  )
}

export default SignIn
