import './Profile.css'
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { toast} from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import {useUpdateUsrMutation} from '../slices/usersApiSlice'
import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import{Container} from 'react-bootstrap'


const Profile = () => {
    
    const [nom,setNom] = useState('')
    const [prenom,setPrenom] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConf,setPasswordConf] = useState('')
    
    
    
    // show layouts 
    const [showUpd,setShowUpd] = useState(false)

    const handleClose = () => setShowUpd(false);
    const handleShow = () => setShowUpd(true);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=>state.auth)
    const userId = userInfo._id
    const [ updateProfile ] = useUpdateUsrMutation()

    useEffect(()=>{
        setNom(userInfo.nom)
        setPrenom(userInfo.prenom)
        setEmail(userInfo.email)
    },[userInfo.setNom,userInfo.prenom,userInfo.setEmail])



    const submitHandler = async(e)=>{
        e.preventDefault()
        if(password !== passwordConf){
            toast.error("password don't match ")
        }else{
            try {
                const res = await updateProfile({
                    _id:userInfo._id,
                    nom,
                    prenom,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile Updated')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
  return (
    <>
        
    {/* <div className="d-grid gap-2 py-5"> */}
    <Container className='cards'>
        <div class="parent card-group gap-4 mt-5">
            {/* creation de quiz */}
            <div class="card rounded">
                <img src="https://img.freepik.com/vecteurs-libre/quiz-fond-articles-dans-conception-plate_23-2147599082.jpg?w=740&t=st=1686799983~exp=1686800583~hmac=35aa4b02154bfb7a9ea558f67b6e11573c23f14b377352641feada8e7fe83a73" class="card-img-top rounded" alt="..."/>
                <div class="card-body" style={{'backgroundColor':'#F0F8FF'}}>
                <h5 class="card-title">Create a Quiz</h5>
                <p class="card-text">Create your own custom Quiz by filling a form</p>
                </div>
                    <LinkContainer to="/profile/create-quiz" style={{"margin":"4px",'color':'white','backgroundColor':'#782599','border':'none'}}>
                        <Button variant="dark" size="lg">
                            CREATE QUIZ
                        </Button> 
                    </LinkContainer> 
            </div>
            {/* pass le quiz */}
            <div class="card rounded">
                <img src="https://img.freepik.com/vecteurs-libre/fond-violet-mot-quiz-gens-colores_52683-126.jpg?w=740&t=st=1686800130~exp=1686800730~hmac=ce463aad8d43a5e24b7e5b622ec1c159ecf0b2842b21c1d9a70191b67f4123a1" class="card-img-top rounded" alt="..."/>
                <div class="card-body" style={{'backgroundColor':'#F0F8FF'}}>
                <h5 class="card-title">Pass a Quiz</h5>
                <p class="card-text">Type a unique to pass a certain Quiz </p>
                </div>
                <LinkContainer to='/pass-quiz' style={{"margin":"4px",'color':'white','backgroundColor':'#782599','border':'none'}}>
                    <Button  size="lg">
                        PASS QUIZ
                    </Button>
                </LinkContainer>  
            </div>
            {/* tous les quizes creer par utilisateur */}
            <div class="card rounded">
                <img src="https://img.freepik.com/vecteurs-libre/liste-controle-geant_23-2148087937.jpg?w=740&t=st=1686944174~exp=1686944774~hmac=5c5b4f8705139042c6c9f3dfb6cb744b9c71bb94c66013fee86084725b97ec48" class="card-img-top rounded" alt="..."/>
                <div class="card-body" style={{'backgroundColor':'#F0F8FF'}}>
                <h5 class="card-title">Created Quizes</h5>
                <p class="card-text">View your Own Created Quizes </p>
                </div>
                    
            <LinkContainer to={`/profile/get-user-quizs/${userId}`} style={{"margin":"4px",'color':'white','backgroundColor':'#782599','border':'none'}}>
                <Button variant="dark" size="lg">
                    MY QUIZES
                </Button>   
            </LinkContainer>
            </div>
            {/* les quiz passer par utilisateur */}
            <div class="card rounded">
                <img src="https://img.freepik.com/vecteurs-libre/conception-fond-liste-controle_1223-115.jpg?w=740&t=st=1686943758~exp=1686944358~hmac=94a838b62ac7cf3ff8c14ed7c329b18ad6d9cbf75ead883c736d014e189e824c" class="card-img-top rounded" alt="..."/>
                <div class="card-body" style={{'backgroundColor':'#F0F8FF'}}>
                <h5 class="card-title">Passed Quizes</h5>
                <p class="card-text">View all the resaultes of the Quizes you've passed</p>
                </div>
                <LinkContainer to={`/profile/get-passed-quizes/${userId}`} style={{"margin":"4px",'color':'white','backgroundColor':'#782599','border':'none'}}>
                    <Button variant="dark" size="lg" >
                        VIEW RESAULTS
                    </Button>           
                </LinkContainer>
            </div>
        </div>
    </Container>
    <br/>
    <br/>
            {/* mise a jour de profile*/}
            <Container style={{ 'width':'10%'}}>
                <Button className='btnUpdt' size="lg" onClick={handleShow} >
                    Update Profile
                </Button>
            </Container>

            <Offcanvas show={showUpd} onHide={handleClose} style={{'backgroundColor':'#171717','color':'white','margin':'17px 35%'}}>
            <Offcanvas.Header closeButton style={{  'backgroundColor':'#474747' }}>
            <Offcanvas.Title>QuiziT</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <h1>Update Profile : </h1>
                        <Form onSubmit={submitHandler} className='updt-form'>

                            <Form.Group className="my-2" controlId="nom">
                                <Form.Label>Nom :</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="enter your name"
                                value={nom}
                                onChange={(e)=>setNom(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="nom">
                                <Form.Label>Prenom :</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="enter your prenom"
                                value={prenom}
                                onChange={(e)=>setPrenom(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="email">
                                <Form.Label>Email :</Form.Label>
                                <Form.Control
                                type="email"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="password">
                                <Form.Label>Password :</Form.Label>
                                <Form.Control
                                type="password"
                                placeholder="enter your Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className="my-2" controlId="passwordConf">
                                <Form.Label>confirm Password :</Form.Label>
                                <Form.Control
                                type="password"
                                placeholder="confirm password"
                                value={passwordConf}
                                onChange={(e)=>setPasswordConf(e.target.value)}
                                ></Form.Control>
                            </Form.Group> 
                            <Button type="submit" variant='primary' className="mt-3" style  = {{  'backgroundColor':'#782599','border':'none','width':'100%','color':'white'
                        }} >
                                <strong>Update</strong>
                            </Button>

                        </Form>
            </Offcanvas.Body>
        </Offcanvas>
       
            
        
    </>
  )
}

export default Profile