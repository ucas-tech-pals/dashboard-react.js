// DONE REVIEWING: GITHUB COMMIT
import {ChakraProvider} from "@chakra-ui/react"
import {ThemeEditorProvider} from "@hypertheme-editor/chakra-ui"
import "assets/css/App.css"
import AdminLayout from "layouts/admin"
import AuthLayout from "layouts/auth"
import RtlLayout from "layouts/rtl"
import React from "react"
import ReactDOM from "react-dom"
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import {Provider as AuthProvider} from "stores/auth"
import theme from "theme/theme"

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <AuthProvider>
          <HashRouter>
            <Switch>
              <Route path="/auth" component={AuthLayout} />
              <Route path="/admin" component={AdminLayout} />
              <Route path="/rtl" component={RtlLayout} />
              <Redirect from="/" to="/admin" />
            </Switch>
          </HashRouter>
        </AuthProvider>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
)
