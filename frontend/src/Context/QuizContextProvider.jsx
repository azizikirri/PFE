import React, { createContext, useState, ReactNode } from "react";

export const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [QuizResult, setQuizResult] = useState(0);
  const [qttl,setQttl] = useState(0);
  const [qt,setQtitle] = useState('')


  return (
    <QuizContext.Provider value={{ QuizResult, setQuizResult ,qttl, setQttl,qt,setQtitle}}>
        {children}
    </QuizContext.Provider>
  );
}

export default QuizContextProvider;
