import './Login.css'
import { useState,  useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col,Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast} from "react-toastify";


import React from 'react'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault()
        try{
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res})) //setting the user to local strage 
            navigate('/')
        }catch(err){
            toast.error(err?.data?.message || err.error );
        }
    }
  return (
    <Container className="login-container">
        <h1 style={{'fontFamily':'typeof first'}}>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label style={{'fontFamily':'typeof first'}}>Email :</Form.Label>
                <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
                <hr></hr>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label style={{'fontFamily':'typeof first'}}>Password :</Form.Label>
                <Form.Control
                type="password"
                placeholder="enter your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
                <hr></hr>
            </Form.Group>

            <Button type="submit" variant='primary' className="button-sub mt-3" style={{'fontFamily':'typeof first'}}>
                Sign in 
            </Button>

            <Row className="py-3">
                <Col>
                    New to QuiziT ? <Link to='/register' style={{'color':'#FFC300' ,'fontFamily':'typeof first'}}>Register</Link>
                </Col>
            </Row>
        </Form>
    </Container>
  )
}

export default Login