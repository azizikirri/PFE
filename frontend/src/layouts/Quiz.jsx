import './Quiz.css'
import {FaClock} from 'react-icons/fa'
import React, { useState, useEffect,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, VStack, Heading, Text, Flex, Box } from '@chakra-ui/react';
import { QuizContext } from "../Context/QuizContextProvider";
import { toast } from 'react-toastify';
import axios from 'axios';
import {Container} from 'react-bootstrap'

const Quiz = () => {
  const navigate = useNavigate()  ; 
  
  const [quizData, setQuizData]  = useState([]) ;
  const [qId, setQid] = useState('')  ;
  const [currentQuestion, setCurrentQuestion] = useState(0) ;
  const [timeRemaining, setTimeRemaining] = useState(5) ;
  const [score, setScore] = useState(0) ;
  
  const { code } =   useParams()  ; 
  const { QuizResult, setQuizResult } = useContext(QuizContext) ;
  const { qttl, setQttl } = useContext(QuizContext) ;
  const {qt,setQtitle} = useContext(QuizContext)



// get quiz data from api
  useEffect(() => {
    
                const fetchQuizData = async () => {
                  try {
                    const response = await axios.get(`http://localhost:5000/api/users/quiz/${code}`);
                    const Qdata = response.data.q;
                    
                    setQuizData([...Qdata.questions.map(

                      (question) => ({ ...question, time: Qdata.time })

                      )]);

                    setTimeRemaining(Qdata.time); 

                    setQid(Qdata._id);

                    setQtitle(Qdata.quizTitle)
                    // console.log(qTitle);

                  } catch (error) {

                    navigate('/pass-quiz');

                    toast.error(error?.data?.message || error.error);

                  }
                };
                fetchQuizData();

  }, [code]);

// timer 
  useEffect(() => {
        const timer = timeRemaining > 0 && setInterval(() => {
          setTimeRemaining((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
  }, [timeRemaining]);

  useEffect(() => {
          const timer = timeRemaining === 0 && setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < quizData.length) {
              setCurrentQuestion(nextQuestion);
              
            }
            else
            {
              // Calculate the quiz result
              setQuizResult(score)
              setTimeout(() => {
                navigate("/quiz-res", { state: { score: score, QuizId:qId, quizTitle:qt } });
              }, 100);
            }
            setTimeRemaining(quizData[nextQuestion]?.time || 0);
            
          }, 1000);
          return () => clearTimeout(timer);
  }, [timeRemaining,currentQuestion,quizData]);


  const handleAnswerOptionClick = (isCorrect) => {
    
                  if (isCorrect) {
                    setScore(score + 1);
                    
                  }

                  const nextQuestion = currentQuestion + 1;

                  if (nextQuestion < quizData.length) {
                    
                    setCurrentQuestion(nextQuestion);
                    setTimeRemaining(quizData[nextQuestion]?.time || 0);

                  } else {
                    
                    setQuizResult(score)
                    
                    setTimeout(() => {
                      navigate("/quiz-res", { state: { score: score, QuizId:qId ,quizTitle:qt} });
                    }, 100);
                    
                  }

                  
  };

  setQuizResult(score)
  setQttl(quizData.length);

 
  return (
    <Container className='quiz-container'>
        {/* les boxes pour question number et pour le temps */}
          <Container width="90%" color="black" justifyContent="space-between" fontSize="12px" fontWeight={500} className='head'>
                <Box  p="2px 15px"  style={{'color':'white','padding':'30px'}}>
                      <h2 style={{'fontSize':'45px'}}>
                            {`Q:${currentQuestion + 1} / ${quizData.length}`}
                      </h2>
                </Box>
                <Box width="60%">
                      <Text p="50px" fontSize="30px" textAlign="center" 
                            color="white"  borderRadius="10px" style={{'textTransform':'uppercase','border':'solid white','color':'white','backgroundColor':'black'}}>
                        {quizData[currentQuestion]?.question}
                      </Text>
                </Box>
                <Box  p="2px 15px"  style={{'color':'white','fontSize':'50px','padding':'30px'}} className='numerique'>
                      <h2 className={timeRemaining <= 5 ? 'ChangeTimeColor' : ''}><FaClock style={{'fontSize':'50px'}}/>{timeRemaining}</h2>
                </Box>
          </Container>

      
      <Container className='p'>

      <Container p="70px"  textAlign="center" boxShadow="xl" borderRadius="10px"   className='options-parent'>
        {quizData[currentQuestion]?.options.map((option) => (
          
          <Container
            key={option}
            onClick={() => handleAnswerOptionClick(option === quizData[currentQuestion].answer)}
            // p="11px 400px"
            boxShadow="xl"
            width="100%"
            borderRadius="40px"
            mt="80px"
            bg='green'
            color="white"
            textAlign="center"
            cursor="pointer"
           
            className='options'
          >
            
            <h4>{option}</h4>
          </Container>        
        ))}
      </Container>
      </Container>
    </Container>
  );
};

export default Quiz;
