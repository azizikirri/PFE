import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from "react-redux";



const PassQuiz = () => {
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [code, setQuizCode] = useState('');
  const {userInfo} = useSelector((state)=>state.auth)
  const userId = userInfo._id
  const navigate = useNavigate();

  const handleQuizCode = (e) => {
    setQuizCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/pass-quiz', { quizCode: code ,userId});
      const { message } = response.data;

      if (message === 'You have already passed this quiz!') {
          toast.error(message);
          navigate('/profile')
        } else {
            console.log("countdown");
            navigate(`/quiz/${code}`);
        }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Container style={{  'marginTop': '80px','width': '70%','marginBottom':'80px', 'backgroundColor':'#572257','padding':'20px','borderRadius':'5px' }}>
        <Form onSubmit={handleSubmit} method="POST" style={{ backgroundColor: '#450245', padding: '10px', 'borderRadius': '5px' ,'color':'white'}}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label style={{'fontSize':'30px'}}> ENTER QUIZ CODE : </Form.Label>
            <br />
            <Form.Control
              size="lg"
              type="number"
              placeholder="enter your quiz code "
              value={code}
              onChange={handleQuizCode}
              

              />
          </Form.Group>
          <br />
          <Button type="submit" size="lg" style={{ width: '100%' ,'backgroundColor':'#d400d4','border':'none' }}>
                          START QUIZ
          </Button>
        </Form>
        <br></br>
        <Button variant='dark' style={{ width: '100%' ,'backgroundColor':'#edb9ed'}}>
            <a href='/profile' style={{'textDecoration':'none','color':'#b500b5'}} >GO BACK TO PROFILE</a>
        </Button>
      </Container>
    </>
  );
};

export default PassQuiz;
