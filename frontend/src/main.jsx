import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
// import '../index.js'
import PrivatePages from './layouts/PrivatePages'
import Home from './layouts/Home.jsx'
import Login from './layouts/Login.jsx'
import Register from './layouts/Register.jsx'
import Profile from './layouts/Profile.jsx'
import CreatQuiz from './layouts/CreatQuiz.jsx'
import PassQuiz from './layouts/PassQuiz.jsx'
import Quiz from './layouts/Quiz.jsx'
import UserPassedQuizes from './layouts/UserPassedQuizes.jsx'
import UserCreatedQuizs from './layouts/UserCreatedQuizs.jsx'
import axios from 'axios'
import Resault from './layouts/Resault'
import QuizContextProvider from './Context/QuizContextProvider';
import OneQuizREs from './layouts/OneQuizREs'
import SeeRes from './layouts/SeeRes.jsx'
axios.defaults.withCredentials = true


const router = createBrowserRouter(
  createRoutesFromElements(
            
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      {/* les routes priveé */}
      <Route path='' element={<PrivatePages/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/create-quiz' element={<CreatQuiz/>}/>
            <Route path='/pass-quiz' element={<PassQuiz/>}/>
            <Route path='/quiz/:code' element={<Quiz/>}/>
            <Route path='/quiz-res' element={<Resault/>}/>
            <Route path='/profile/get-user-quizs/:userId' element={<UserCreatedQuizs/>}/>
            <Route path='/profile/get-passed-quizes/:userId' element={<UserPassedQuizes/>}/>
            <Route path='/profile/fetch-quizes-res/:QuizId' element={<SeeRes/>}/>
            <Route path='/one-quiz' element={<OneQuizREs/>}/>
      </Route>
      
    </Route>
            
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
          <QuizContextProvider>
                <RouterProvider router={router} />
          </QuizContextProvider>
    </React.StrictMode>
  </Provider>
)
