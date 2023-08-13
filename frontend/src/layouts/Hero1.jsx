import React from 'react';
import { ButtonGroup ,Card } from 'react-bootstrap';
import './hero1.css';



export default function hero1() {
  return (
    <section className='hero'>
      <div className='p-5 text-center bg-image'>
        <div className='m-5'>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h2 className='shadow mb-3' >Welcome To Q<b className='waviy'>uiziT</b> </h2>
              <h2 className='animate-charcter my-5'>Create and pass Quizes in a very simple elegant way!</h2>
              <ButtonGroup className='gap-2 p-5'>
                <a className='hero-btn1 btn btn-outline-light btn-lg' href='/profile/create-quiz' role='button'  style={{'fontFamily':'typeof first' ,'fontSize':'20px'}}>
                  Create a Quiz
                </a>

                <a className='hero-btn2 btn btn-outline-light btn-lg' href='/pass-quiz' role='button' style={{'fontFamily':'typeof first' ,'fontSize':'20px'}}>
                  Pass a Quiz
                </a>
              </ButtonGroup>
              
            </div>
          </div>
        </div>
      </div>
      <div className="parentt">
        <div className="imagess">
      
        <Card className='col col1 ' >
          <Card.Img variant="top" src="./pictures/profile2.png" alt="image" />
        </Card>
        <Card className='col col2' >
          <Card.Img variant="top" src="./pictures/profile.PNG" alt="image" />
        </Card>
        <Card className='col col3' >
          <Card.Img variant="top" src="./pictures/codequiz.PNG" alt="image" />
        </Card>
        <Card className='col col4'>
          <Card.Img variant="top" src="./pictures/Questions-Quiz.PNG" alt="image" />
        </Card>
        <Card className='col col5'>
          <Card.Img variant="top" src="./pictures/testquiz.PNG" alt="image" />
        </Card>
        <Card className='col col6'>
          <Card.Img variant="top" src="./pictures/update-prof.PNG" alt="image" />
        </Card>
        <Card className='col col7'>
          <Card.Img variant="top" src="./pictures/create-quiz.PNG" alt="image" />
        </Card>
        <Card className='col col8'>
          <Card.Img variant="top" src="./pictures/logout.PNG" alt="image" />
        </Card>
      </div>
      </div>


    </section>
  );
}
