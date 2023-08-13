import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaGithub,FaInstagram ,FaTwitter,FaLinkedin,FaGoogle,FaHeart} from 'react-icons/fa';
const Footer = () => {
  return (
    
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#0f010e' ,'marginTop':'90px'}}>
      
        <Container className="p-4 pb-0">
          
          <section>
          
            <Row>
              
              <Col md={3} lg={3} xl={3} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold" style={{'fontFamily':'typeof first','fontSize':'20px'}}>Quizit</h6>
                <p style={{'fontFamily':'typeof first','fontSize':'16px'}}>
                Quizit app is a simple website where you can create your own custom Quizes and share them with your friends or students, Or Pass quizes that are made by others
                </p>
              </Col>
             

              <hr className="w-100 clearfix d-md-none" />

             
              <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
             <h6 className="text-uppercase mb-4 font-weight-bold" style={{'fontFamily':'typeof first','fontSize':'20px','cursor':'pointer'}}>Products</h6>
                <p>
                  <a className="text-white" style={{'fontFamily':'typeof first','fontSize':'20px','cursor':'pointer'}}>QuizPlatform</a>
                </p>
                <p>
                  <a className="text-white" style={{'fontFamily':'typeof first','fontSize':'20px' ,'cursor':'pointer'}}>Ecomm</a>
                </p>
                <p>
                  <a className="text-white" style={{'fontFamily':'typeof first','fontSize':'20px','cursor':'pointer'}}>CouresiT</a>
                </p>
                <p>
                  <a className="text-white" style={{'fontFamily':'typeof first','fontSize':'20px','cursor':'pointer'}}>ScoreLive </a>
                </p>
              </Col>
             

              <hr className="w-100 clearfix d-md-none" />

              
              <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold" style={{'fontFamily':'typeof first','fontSize':'20px'}}>Contact</h6>
                <p><i className="fas fa-home mr-3" style={{'fontFamily':'typeof first','fontSize':'20px'}}></i> Tikiwine, Agadir</p>
                <p><i className="fas fa-envelope mr-3" style={{'fontFamily':'typeof first','fontSize':'20px'}}></i> TEST@gmail.com</p>
                <p><i className="fas fa-phone mr-3" style={{'fontFamily':'typeof first','fontSize':'20px'}}></i> + 212 234 567 88</p>
                <p><i className="fas fa-print mr-3" style={{'fontFamily':'typeof first','fontSize':'20px'}}></i> + 212 234 567 89</p>
              </Col>
              {/* Grid column */}

              {/* Grid column */}
              <Col md={3} lg={2} xl={2} className="mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold" style={{'fontFamily':'typeof first','fontSize':'20px'}}>Follow us</h6>

                {/* Facebook */}
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button"><FaFacebookF/></a>

                {/* Twitter */}
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#1DA1F2','border':'none' }} href="#!" role="button"><FaTwitter/></a>

                {/* Instagram */}
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' ,'border':'none'}} href="#!" role="button"><FaInstagram/></a>

                {/* Linkedin */}
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button"><FaLinkedin/></a>

                {/* Github */}
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: 'black','border':'none' }} href="#!" role="button"><FaGithub/></a>
                
                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: 'red','border':'none' }} href="#!" role="button"><FaGoogle/></a>
              </Col>
            </Row>
            {/* Grid row */}
          </section>
          {/* Section: Links */}
        </Container>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: '#0f0014' ,'fontFamily':'typeof first','fontSize':'20px'}}>
          Made with <FaHeart style={{'color':'#d276f5','fontSize':'30px',}}/> by Aziz & Hicham
          
        </div>
        {/* Copyright */}
      </footer>
      
      
    /* End of .container */
  );
};

export default Footer;
