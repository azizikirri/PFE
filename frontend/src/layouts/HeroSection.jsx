import { Container, Card, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>BrainBox Authentication</h1>
          <p className='text-center mb-4'>
              Create and pass awesome Quizs and share them with others !
          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Start Now
            </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Button variant='secondary'>
                Sign Up
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;