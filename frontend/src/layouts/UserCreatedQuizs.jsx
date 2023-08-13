import React, { useEffect, useState } from 'react';
import {FaTable, FaTrash} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';


const UserCreatedQuizs = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    const  getUserQuizzes = async () => {

      try {

        const response = await axios.get(`http://localhost:5000/api/users/profile/get-user-quizs/${userId}`);
        const fetchedQuizzes = response.data.data;
        setUserQuizzes(fetchedQuizzes);
      } catch (error) {
        toast.error('Error while fetching your quizzes');
      }
    };

    getUserQuizzes();

  }, [userId] );

  const HandleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/profile/delete/${id}`);
      toast.success('Quiz deleted successfully');
      setUserQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      toast.error('Quiz not found');
    }
  };
  const SeeRes=async(QuizId)=>{
    try {
      navigate(`/profile/fetch-quizes-res/${QuizId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section style={{'backgroundColor':'#1f011f','padding':'5px ','borderRadius':'4px','textTransform':'uppercase'}}>
      {userQuizzes.length === 0 ? (
        <h1 style={{ color: 'white' }}>No quizzes yet</h1>
      ) : (
        <div>
          <Table responsive="lg">
            <thead style={{ color: 'white' }}>
              <tr>
                          <th><FaTable/></th>
                          <th>TITLE</th>
                          <th>RESAULTS</th>
                          <th>DELETE </th>
              </tr>
            </thead>
            <tbody style={{'color':'#e3c1e3'}}>
              {userQuizzes.map((quiz, i) => (
                <tr key={quiz._id} style={{ color: '#e3c1e3' ,'alignItems':'center','justifyContent':'center'}} >

                          <td>Quiz N°: {i + 1}</td>

                          <td>{quiz.quizTitle}</td>

                          <td>
                            <Button variant="dark"onClick={() => SeeRes(quiz._id)}
                              style={{ backgroundColor: '#a86ca8', color: 'white', border:'none' }}>
                                   RESAULTS
                            </Button>
                          </td>

                          <td>
                            <Button
                              variant="dark"
                              onClick={() => HandleDeleteQuiz(quiz._id)}
                              style={{ backgroundColor: '#ba7dba', color: 'black' }}
                            >
                                  <FaTrash/>
                            </Button>
                          </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    <div>
    <Button style={{'backgroundColor':'black','border':'none','width':'100%'}}>
      <a href='/profile' style={{'color':'white','textDecoration':'none'}}>Back to Profile</a>
    </Button>

    </div>
    </section>
  );
};

export default UserCreatedQuizs;
