import React from 'react'
import { useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Table } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { toast} from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import {useUpdateUsrMutation} from '../slices/usersApiSlice'
import axios from 'axios'

const UserPassedQuizes = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    const userId = userInfo._id
    const [userPassedQuizes,setPassedQuizes] = useState([])
    useEffect(()=>{
      const getQuizData = async() =>{
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/get-passed-quizes/${userId}`)
          setPassedQuizes(response.data.data)
          console.log(userPassedQuizes);
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
      }

      getQuizData()

    },[userId]
    )
    useEffect(() => {
      console.log("User Passed Quizes:", userPassedQuizes);
    }, [userPassedQuizes]);
  
    if (userPassedQuizes === undefined) {
      return <h1 style={{'color':'yellowgreen','textTransform':'uppercase'}}>no quizes yet</h1>; // or show a loading spinner
    }
  
    if (userPassedQuizes.length === 0) {
      return <h1 style={{'color':'yellowgreen','textTransform':'uppercase'}}>No passed quizes yet!</h1>;
    }
  return (
  
        <section style={{'color':'white'}}>
          <div className='passed-quizes-table' >
                <h2 style={{'textAlign':'center','fontFamily':'revert-layer'}}>RESAULTS OF THE QUIZES YOU PASSED </h2>
                <Table style={{'color':'white'}}>
                  <thead style={{'color':'#0f080f','fontSize':'20px'}}>
                    <tr>
                      <th>Quiz Title</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPassedQuizes.map((quiz) => (
                      <tr key={quiz._id}>
                        <td>{quiz.quizTitle}</td>
                        <td><span style={{'backgroundColor':'#660566','padding':'8px','borderRadius':'50%'}}>{quiz.QuizRes}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button style={{'backgroundColor':'#590759','border':'none','width':'100%'}}>
                <a href='/profile' style={{'color':'white','textDecoration':'none'}}>Back to Profile</a>
              </Button>
          </section>
    
   
  )
}

export default UserPassedQuizes