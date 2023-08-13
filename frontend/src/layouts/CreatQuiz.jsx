import {useState} from 'react'
import { FaTrash,FaPlusCircle,FaQrcode,FaCheck,FaSave,FaTimesCircle,FaTiktok, FaClock} from 'react-icons/fa';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './CreateQuiz.css'
import { toast} from "react-toastify";
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col,ButtonGroup, Container } from 'react-bootstrap'


const CreatQuiz = () => {
    const [showQ,setShowQ] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector( (state)=>state.auth )
    const e= userInfo.email
    const [ quizData, setQuizData ] = useState({

        quizCode: undefined,
        quizCreatorEmail: e,
        quizTitle: '',
        questions: [],
        time:null

      });

      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Delete this option
        </Tooltip>
      );
      const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          add option 
        </Tooltip>
      );
      const renderTooltip3 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          delete this question
        </Tooltip>
      );
      const handleInputChange = (e, index, field, optionIndex) => {
        const { value } = e.target;
        const questions = [...quizData.questions];
        if (field === 'options') {
          questions[index].options[optionIndex] = value;
        } else {
          questions[index][field] = value;
        }
        setQuizData({ ...quizData, questions });
      };
      const updatTime = (e)=>{
        const { value } = e.target;
        setQuizData({ ...quizData, time: value });
      }
      const generateQuizCode = () => {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const handleGenerateQuiz = () => {
        if (quizData.questions.length === 0) {
          alert('Error: Please add at least one question to generate the quiz.');
        } else {
          const code = generateQuizCode();
          setQuizData({ ...quizData, quizCode: code });
          toast.success(`Quiz generated! Quiz Code: ${code}`);
        }
      };
      const addQuestion = () => {
        // setShowQ(true);
        setQuizData({
          ...quizData,
          questions: [...quizData.questions, { question: '', answer: '', options: [] }],
        });
      };
    
      const addOption = (index) => {
        const questions = [...quizData.questions];
        questions[index].options.push('');
        setQuizData({ ...quizData, questions });
      };
    
      const removeOption = (index, optionIndex) => {
        const questions = [...quizData.questions];
        questions[index].options.splice(optionIndex, 1);
        setQuizData({ ...quizData, questions });
      };
    
      const deleteQuestion = (index) => {
        const questions = [...quizData.questions];
        questions.splice(index, 1);
        setQuizData({ ...quizData, questions });
      };
    
      const updateTitle = (e) => {
        const { value } = e.target;
        setQuizData({ ...quizData, quizTitle: value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // Do something with the quizData, like sending it to an API or storing it in a state management system
       try {
            const res = await axios.post('http://localhost:5000/api/users/profile/create-quiz',quizData)
            toast.success('Your Quiz Has been Created')
            navigate('/profile')
           
       } catch (error) {
            toast.error("Please fill form inputs , or Check if you typed your email correctly !")
            navigate('/profile/create-quiz')
       }
      };
    
  return (
    <>
    <Container className='form-container'>
      <h3 style={{'color':'#cae6c8','fontFamily':'initial'}}>PLEASE FILL THIS FORM TO CRREATE YOUR QUIZ :</h3>
            <Form onSubmit={handleSubmit} >
           <div className="time-title">
              <Form.Group controlId="quizTitle" >
                  <Form.Label>QUIZ TITLE :</Form.Label>
                  <Form.Control
                  type="text"
                  name="quizTitle"
                  value={quizData.quizTitle}
                  onChange={updateTitle}
                  placeholder='enter a title for your Quiz'
                  className='t'
                  />
              </Form.Group>
              <Form.Group controlId="q-time">
                  <Form.Label><FaClock style={{'fontSize':'20px'}}/> QUESTION TIME :</Form.Label>
                  <Form.Control
                  type="number"
                  name="time"
                  value={quizData.time}
                  onChange={updatTime}
                  placeholder='time of the question (seconds)'
                  className='t'
                  />
              </Form.Group>


           </div>
           
            <div className='q-container'>
            <div>

            
                  {quizData.questions.map((question, index) => (
                      <div key={index}>
                        
                      <Form.Group controlId={`question-${index}`}>
                          <Form.Label >Question Number {index + 1}</Form.Label>
                          <Form.Control
                          type="text"
                          name="question"
                          value={question.question}
                          onChange={(e) => handleInputChange(e, index, 'question')}
                          placeholder='type your question here'
                          className='Q-section'
                          />
                      </Form.Group>

                      <Form.Group controlId={`answer-${index}`}>
                          <Form.Label>Correct Answer {index + 1}</Form.Label>
                          <Form.Control
                          type="text"
                          name="answer"
                          value={question.answer}
                          onChange={(e) => handleInputChange(e, index, 'answer')}
                          placeholder='enter the correct answer of this question'
                          />
                      </Form.Group>

                      <Form.Label>Options : (make sure you add The Correct answer in random option input down bellow )</Form.Label>
                      <div style={{'backgroundColor':'#1a0717','padding':'10px','borderRadius':'8px','paddingTop':'20px'}} >
                        <div className='option-row'>
                          {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} >
                                    <div xs={10} className='option-col'>
                                      <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                          >
                                        <Button
                                        variant="danger"
                                        onClick={() => removeOption(index, optionIndex)}
                                        className='rounded'
                                        style={{'backgroundColor':'#802876','color':'white','border':'none'}}
                                        >

                                                <FaTrash/> 

                                        </Button>
                                              </OverlayTrigger>
                                        <Form.Control
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleInputChange(e, index, 'options', optionIndex)}
                                        placeholder='add other false option'
                                        className='option-section'                 
                                        />
                                    </div>
                              </div>
                          ))}

                        </div>
                        <div className='d-flex justify-content-center gap-2 py-3 p-4 mt-3 ' >

                        <ButtonGroup className='gap-2'>
                                  <OverlayTrigger
                                              placement="left"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltip2}
                                            >
                                              <Button variant="secondary" onClick={() => addOption(index)} className='rounded' w-20 btn-block style={{'color':'white','backgroundColor':'#305063'}}>
                                                  <FaPlusCircle/>
                                              </Button> 
                                </OverlayTrigger>
                                <OverlayTrigger
                                              placement="right"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltip3}
                                            >
                                      <Button variant="danger" onClick={() => deleteQuestion(index)} className='rounded' w-20 btn-block style={{'backgroundColor':'#f5426c','color':'white'}}>
                                          <FaTrash/>
                                      </Button>
                                </OverlayTrigger>
                                
                        </ButtonGroup>
                            </div>
                          </div>
                      </div>
                  ))}
            </div>
               
          </div>
                        <div className="last-buttons">
                          
                                <ButtonGroup className='gap-2 py-3 w-30' >
                                        <Button variant="primary" onClick={addQuestion} className='rounded' style={{'backgroundColor':'black','border':'none','color':'white'}}>
                                            ADD QUESTION <FaPlusCircle/> 
                                        </Button>
                                        <Button variant="primary" onClick={handleGenerateQuiz} className='rounded'  style={{'backgroundColor':'black','border':'none','color':'white'}}>
                                            GENERATE CODE <FaQrcode/>
                                        </Button>
                                </ButtonGroup>
                                <div className='d-flex w-100 justify-content-center'>
                                        {quizData.quizCode && (
                                            <div  style={{'backgroundColor':'#60017d','padding':'7px','margin':'5px','borderRadius':'4px','width':'100%'}}>
                                            <h4 className='text-white'style={{'color':'#cae6c8'}}> YOUR QUIZ CODE :</h4>
                                                <p  className='d-flex w-100 justify-content-center' style={{'fontSize':'60px','color':'white','backgroundColor':'black','padding':'4px','borderRadius':'3px','fontFamily':'monospace'}}>{quizData.quizCode}</p>
                                            </div>
                                        )}
                                </div>
                                        <Button  variant="primary" type="submit" className='rounded w-20  py-3 mt-4'  style={{'backgroundColor':'black','border':'none','color':'white','fontSize':'15px','width':'29%'}}>
                                            <FaSave/> SAVE
                                        </Button>
                          </div>     


            </Form> 

    </Container>
    
        
    </>
    
  )
}

export default CreatQuiz