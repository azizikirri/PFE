import React, { useState, useEffect } from 'react';
import {  FaSort } from 'react-icons/fa';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SeeRes = () => {
  const { QuizId } = useParams(); // Fetch QuizId from URL parameters
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/fetch-quizes-res/${QuizId}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [QuizId]);

  const handleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <section className="text-white fs-5">
      <h1 style={{ color: 'white',backgroundColor:'#450c45','textAlign':'center','padding':'10px' }}>Quiz Results:</h1>
      {data && data.q && data.q.length > 0 ? (
        <Table className="text-white" style={{ backgroundColor: '#0f000f'}}>
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>
                <button  className="btn btn-link text-white" style={{'textDecoration':'none'}}>
                  Quiz Result
                   <span> <button onClick={handleSortOrder} style={{'backgroundColor':'black','color':'#ba06ba','border':'none'}}><FaSort/></button></span>
                </button>
              </th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody style={{ color: 'white' }}>
            {data.q
              .sort((a, b) => {
                if (sortOrder === 'asc') {
                  return a.QuizRes - b.QuizRes;
                } else {
                  return b.QuizRes - a.QuizRes;
                }
              })
              .map((result) => (
                <tr key={result._id}>
                  <td>{result.quizTitle}</td>
                  <td>{result.QuizRes}</td>
                  <td>{result.nom}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No quiz data available.</p>
      )}
    </section>
  );
};

export default SeeRes;
