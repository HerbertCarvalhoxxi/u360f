import Header from "./components/Header"
import Form from "./components/Form"
import { ToastContainer } from 'react-toastify'
import { MyContextProvider } from "./MyContext" 

function App() {
  
  return (
    <>
      <MyContextProvider>
        <Header></Header>
        <Form></Form>
        <ToastContainer />
      </MyContextProvider>  
    </> 
  )
}

export default App
