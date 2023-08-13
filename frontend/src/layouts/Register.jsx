import { useState,useEffect } from "react";
import './Registre.css'
import {Link,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { toast} from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import React from 'react'


const Register = () => {

    const [nom,setNom] = useState('')
    const [prenom,setPrenom] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConf,setPasswordConf] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=>state.auth)
    const [register] = useRegisterMutation()

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])



    const submitHandler = async(e)=>{
        e.preventDefault()
        if(password !== passwordConf){
            toast.error("password don't match ")
        }else{
            try {
                const res = await register({nom,prenom,email,password}).unwrap()
                dispatch(setCredentials({...res})) //setting the user to local strage 
                navigate('/')
            } catch (error) {
                toast.error(err?.data?.message || err.error );
            }
        }
    }
    
  return (
    <Container style={{'backgroundColor':'#271024','width':'60%','color':'white','padding':'10px','borderRadius':'5px'}}>
        <h1 style={{'textAlign':'center'}}>Sign Up</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group className="my-2" controlId="nom">
                <Form.Label style={{'fontFamily':'typeof first','fontSize':'20px'}}>Nom :</Form.Label>
                <Form.Control
                type="text"
                placeholder="enter your name"
                value={nom}
                onChange={(e)=>setNom(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="nom">
                <Form.Label style={{'fontFamily':'typeof first','fontSize':'20px'}}>Prenom :</Form.Label>
                <Form.Control
                type="text"
                placeholder="enter your prenom"
                value={prenom}
                onChange={(e)=>setPrenom(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label style={{'fontFamily':'typeof first','fontSize':'20px'}}>Email :</Form.Label>
                <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label style={{'fontFamily':'typeof first','fontSize':'20px'}}>Password :</Form.Label>
                <Form.Control
                type="password"
                placeholder="enter your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="passwordConf">
                <Form.Label style={{'fontFamily':'typeof first','fontSize':'20px'}}>confirm Password :</Form.Label>
                <Form.Control
                type="password"
                placeholder="confirm password"
                value={passwordConf}
                onChange={(e)=>setPasswordConf(e.target.value)}
                ></Form.Control>
            </Form.Group> 
            <Button type="submit" variant='primary' className="mt-3" style={{'backgroundColor':'#750062','border':'none','width': '100%','color':'white' ,'fontFamily':'typeof first','fontSize':'20px'}}>
                Sign up 
            </Button>
            <Row className="py-3">
                <Col style={{'fontFamily':'typeof first','fontSize':'20px'}}>
                Already in QuiziT ? <Link to='/login'  style={{'color':'#FFC300' ,'fontFamily':'typeof first'}}>Login</Link>
                </Col>
            </Row>
        </Form>
    </Container>
  )
}

export default Register