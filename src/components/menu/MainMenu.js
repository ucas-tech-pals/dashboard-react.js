// DONE REVIEWING: GITHUB COMMIT 🔓
// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import {useState} from "react"
// Assets
import {MdFileOpen, MdLock, MdOutlineMoreHoriz} from "react-icons/md"

export default function Banner(props) {
  const {...rest} = props

  const textColor = useColorModeValue("secondaryGray.500", "white")
  const textHover = useColorModeValue(
    {color: "secondaryGray.900", bg: "unset"},
    {color: "secondaryGray.500", bg: "unset"}
  )
  const brandStars = useColorModeValue("brand.500", "brand.400")
  const iconColor = useColorModeValue("brand.500", "white")
  const bgList = useColorModeValue("white", "whiteAlpha.100")
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  )
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100")
  const bgHover = useColorModeValue(
    {bg: "secondaryGray.400"},
    {bg: "whiteAlpha.50"}
  )
  const bgFocus = useColorModeValue(
    {bg: "secondaryGray.300"},
    {bg: "whiteAlpha.100"}
  )
  const [isLoading, setIsLoading] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [file, setFile] = useState(null)
  const [fileToVerify, setFileToVerify] = useState(null)

  // Ellipsis modals
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal
  } = useDisclosure()
  const {
    isOpen: isOpenVerification,
    onOpen: onOpenVerification,
    onClose: onCloseVerification
  } = useDisclosure()
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult
  } = useDisclosure()

  return (
    <>
      <Menu isOpen={isOpenModal} onClose={onCloseModal}>
        <MenuButton
          align="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          onClick={onOpenModal}
          borderRadius="10px"
          {...rest}>
          <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
        </MenuButton>
        <MenuList
          w="250px"
          minW="unset"
          maxW="250px !important"
          border="transparent"
          backdropFilter="blur(63px)"
          bg={bgList}
          boxShadow={bgShadow}
          borderRadius="20px"
          p="15px">
          <MenuItem
            transition="0.2s linear"
            color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent"
            }}
            _focus={{
              bg: "transparent"
            }}
            mb="20px">
            <Flex align="center" onClick={onOpen}>
              <Icon as={MdFileOpen} h="16px" w="16px" me="8px" />
              <Text fontWeight="400">Issue Certifications</Text>
            </Flex>
          </MenuItem>
          <MenuItem
            transition="0.2s linear"
            color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent"
            }}
            _focus={{
              bg: "transparent"
            }}>
            <Flex align="center" onClick={onOpenVerification}>
              <Icon as={MdLock} h="16px" w="16px" me="8px" />
              <Text fontWeight="400">Verify Certifications</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Certification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                Name<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired
                ms={{base: "0px", md: "0px"}}
                type="text"
                placeholder="IT Degree"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={({currentTarget: {value}}) => setName(value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired
                ms={{base: "0px", md: "0px"}}
                type="email"
                placeholder="info@certification.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={({currentTarget: {value}}) => setEmail(value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                File<Text color={brandStars}>*</Text>
              </FormLabel>
              <input
                type="file"
                onChange={({target: {files}}) => {
                  if (files[0].type === "application/pdf") setFile(files[0])
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!name || !email || !file}
              isLoading={isLoading}
              colorScheme="brand"
              onClick={() => {
                if (!name || !email || !file) return
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  window.open(`${window.location.origin}/q-a.pdf`, "blank")
                  onClose()
                }, 2000)
              }}>
              Issue Certification
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        size="2xl"
        isOpen={isOpenVerification}
        onClose={onCloseVerification}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Certification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                File<Text color={brandStars}>*</Text>
              </FormLabel>
              <input
                type="file"
                onChange={({target: {files}}) => {
                  if (files[0].type === "application/pdf")
                    setFileToVerify(files[0])
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!fileToVerify}
              isLoading={isLoading}
              colorScheme="brand"
              onClick={() => {
                if (!fileToVerify) return
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  onCloseVerification()
                  onOpenResult()
                }, 2000)
              }}>
              Verify Certification
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal size="2xl" isOpen={isOpenResult} onClose={onCloseResult}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certification Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                Name
              </FormLabel>
              <Input
                _disabled={{opacity: 1}}
                isDisabled
                isRequired
                ms={{base: "0px", md: "0px"}}
                type="text"
                value="IT Degree"
                placeholder="IT Degree"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={({currentTarget: {value}}) => setName(value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                Email
              </FormLabel>
              <Input
                _disabled={{opacity: 1}}
                isDisabled
                isRequired
                ms={{base: "0px", md: "0px"}}
                type="email"
                value="shawqi@ucas.edu.ps"
                placeholder="info@certification.com"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={({currentTarget: {value}}) => setEmail(value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontWeight="500"
                color={textColor}
                mb="8px">
                Is Verified?
              </FormLabel>
              <Input
                _disabled={{opacity: 1}}
                isDisabled
                isRequired
                ms={{base: "0px", md: "0px"}}
                type="text"
                value="Yes"
                placeholder="Yes/No"
                mb="24px"
                fontWeight="500"
                size="lg"
                onChange={({currentTarget: {value}}) => setEmail(value)}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
