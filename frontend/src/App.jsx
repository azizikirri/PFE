import { Outlet} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import React from 'react'
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
// import QuizContextProvider from './Context/QuizContextProvider';
// import Home from './layouts/Home'
const App = () => {
  return (
    <>
    
      <Header/>
      <ToastContainer/>
      <Container className='my-2' style={{'height':'auto'}}>
          <Outlet/>
      </Container>
          <Footer/>
    

    </>
  )
}

export default App