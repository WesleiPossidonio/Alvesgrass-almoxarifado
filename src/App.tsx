import { ToastContainer } from "react-toastify"
import { AppProvider } from "./contexts"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./routes/Routes"

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
         <Router />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
