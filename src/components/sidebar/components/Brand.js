// DONE REVIEWING: GITHUB COMMIT 🔓
// Chakra imports
import {Flex, Text} from "@chakra-ui/react"

// Custom components
import {HSeparator} from "components/separator/Separator"

export const SidebarBrand = function SidebarBrand() {
  return (
    <Flex align="center" direction="column">
      <Text fontSize="34px" fontWeight="bold" mb="24px">
        uCertified
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  )
}

export default SidebarBrand
