// DONE REVIEWING: GITHUB COMMIT 🔓
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

// Chakra imports
import {Box, SimpleGrid} from "@chakra-ui/react"
import {useEffect, useState} from "react"
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable"
import {columnsDataDevelopment} from "views/admin/dataTables/variables/columnsData"

export default function Settings() {
  const [certifications, setCertifications] = useState([])
  useEffect(() => {
    setCertifications([
      {name: "CS Degree"},
      {name: "Cyber-Security Engineering"},
      {name: "AI Engineering"}
    ])
  }, [])
  // Chakra Color Mode
  return (
    <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
      <SimpleGrid
        mb="20px"
        columns={{sm: 1}}
        spacing={{base: "20px", xl: "20px"}}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={certifications}
        />
      </SimpleGrid>
    </Box>
  )
}
