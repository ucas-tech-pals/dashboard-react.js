// DONE REVIEWING: GITHUB COMMIT 🔓
import {Icon} from "@chakra-ui/react"
import {MdFileCopy, MdHome, MdLock, MdPerson} from "react-icons/md"

// Admin Imports
import DataTables from "views/admin/dataTables"
import MainDashboard from "views/admin/default"
import Profile from "views/admin/profile"
import RTL from "views/admin/rtl"

// Auth Imports
import SignInCentered from "views/auth/signIn"
import SignUpCentered from "views/auth/signUp"

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard
  },
  {
    name: "Certifications",
    layout: "/admin",
    path: "/certifications",
    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="inherit" />,
    component: DataTables,
    secondary: true
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignUpCentered
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: RTL
  }
]

export default routes
