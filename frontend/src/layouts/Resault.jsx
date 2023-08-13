import React from "react";
import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate,useParams,useLocation  } from "react-router-dom";
import { useState ,useContext,useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { QuizContext } from "../Context/QuizContextProvider";


function Result() {


  const { state } =   useLocation();
  const QuizId  = state.QuizId;
  const quizTitle = state.quizTitle;
  const { QuizResult , qttl } = useContext(QuizContext)
  const { userInfo } = useSelector((state)=>state.auth)
  const userId = userInfo._id


  const resData = {

    QuizRes:QuizResult,
    QuizId:QuizId,
    userId:userId,
    quizTitle:quizTitle
    
  }

  console.log(resData);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const saveQuizResult = async () => {
      try {

        const response = await axios.post('http://localhost:5000/api/users/quiz-res', resData);

      } catch (error) {

        console.log(error.response.data.message);
        
      }
    };
  
    saveQuizResult();
  }, [QuizId]);
  
  const backToHome = () => {
    navigate("/");
  };

  return (
    <VStack pt={'20px'} fontFamily={'Lora'} spacing={6} alignItems="center" >
      { QuizResult >= qttl/2 ? (
      <>    
            <img src="https://cdn-icons-png.flaticon.com/512/786/786755.png?w=740&t=st=1686937827~exp=1686938427~hmac=5e3ec4436e5e433df99f74466a2f97d2c8a33b7b544e7eb7df1264768656fffc" alt="Trophy" width={200} height={300} />
              <Heading as="h1" size="xl" fontFamily={'Lora'} style={{'color':'#581845'}}>
                CONGRATULATIONS! :)
              </Heading> 
              <Text fontSize="lg" style={{'color':'white','justifyContent':'center'}}>
                  <h1>YOUR SCORE :</h1>
                  <h1 style={{'backgroundColor':'#75002b','width':'60%','fontSize':'100px','padding':'20px','borderRadius':'50%'}}> {QuizResult}/{qttl}</h1>
            </Text>
        </>) : (<>
          <img src="https://i.pinimg.com/736x/49/2d/0d/492d0d307b5506ffecab62a62ca6c58a.jpg" alt="Trophy" width={200} height={300} />
        <Heading textAlign={'center'} as="h1" size="xl" fontFamily={'Lora'} style={{'color':'pink'}}>
             Sorry for the Low Score :(
       </Heading>
       <Text fontSize="lg" style={{'color':'white','justifyContent':'center'}}>
                  <h1>YOUR SCORE :</h1>
                  <h1 style={{'backgroundColor':'#75002b','width':'60%','fontSize':'100px','padding':'20px','borderRadius':'50%', 'left':'100px'}}> {QuizResult}/{qttl}</h1>
            </Text>
        </>)
        
       }

      <Button colorScheme="teal" onClick={backToHome} style={{'backgroundColor':'#900C3F','borderRadius':'5px','border':'none'}}>
        <h3>Go Back Home</h3>
      </Button>
    </VStack>
  );
}

export default Result;
